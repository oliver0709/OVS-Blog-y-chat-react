import { searchFormSchema as formSchema } from "@/lib/zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoomDB, UserRoom } from "@/schemas/firestore-schema";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth, useFirestore } from "reactfire";


const FriendSearch = () => {
  const db = useFirestore();
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      
      if (auth.currentUser!.email === values.email) {
        form.setError("email", {
          type: "manual",
          message: "You can't search yourself",
        });
        return;
      }

      const q = query(
        collection(db, "users"),
        where("email", "==", values.email),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        form.setError("email", {
          type: "manual",
          message: "User not found",
        });
        return;
      }

      

      const friendDB = querySnapshot.docs[0].data();

      // verifica si ya son amigos
      const q2 = query(
        collection(db, "users"),
        where("uid", "==", auth.currentUser!.uid),
        where("friends", "array-contains", friendDB.uid)
      );

      const querySnapshot2 = await getDocs(q2);

      if (!querySnapshot2.empty) {
        form.setError("email", {
          type: "manual",
          message: "You are already friends",
        });
        return;
      }

      // crea la room
      const newRoomDB: RoomDB = {
        messages: [],
        users: [auth.currentUser?.uid, friendDB.uid],
      };
      const roomRef = await addDoc(collection(db, "rooms"), newRoomDB);

      console.log("1. Room created");

      // agrega la room a ambos usuarios
      const currentUserRoom: UserRoom = {
        roomid: roomRef.id,
        lastMessage: "",
        timestamp: "",
        friendId: friendDB.uid,
      };

      const friendRoom: UserRoom = {
        roomid: roomRef.id,
        lastMessage: "",
        timestamp: "",
        friendId: auth.currentUser!.uid,
      };

      const currentUserRef = doc(db, "users", auth.currentUser!.uid);
      const friendRef = doc(db, "users", friendDB.uid);

      await updateDoc(currentUserRef, {
        rooms: arrayUnion(currentUserRoom),
        friends: arrayUnion(friendDB.uid),
      });

      console.log("2. Current user room added");

      await updateDoc(friendRef, {
        rooms: arrayUnion(friendRoom),
        friends: arrayUnion(auth.currentUser!.uid),
      });

      console.log("3. Friend room added");

      form.reset();
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Search with email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Search Friend
        </Button>
      </form>
    </Form>
  );
};
export default FriendSearch;