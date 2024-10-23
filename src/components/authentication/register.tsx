import { registerFormSchema as formSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserDB } from "@/schemas/firestore-schema";
import { useLoadingStore } from "@/store/loading-store";
import {
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth, useFirestore, useStorage } from "reactfire";
import { useState } from "react";

const Register = () => {
  const auth = useAuth();
  const db = useFirestore();
  const storage = useStorage();
  const { loading, setLoading } = useLoadingStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      photoURL: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("User created");

      // 1. Guardar avatar en storage
      const storageRef = ref(storage, "avatars/" + user.uid + ".jpg");
      if (selectedFile) {
        await uploadBytes(storageRef, selectedFile);
      }

      // 2. Recuperar la URL del avatar
      const photoURL = await getDownloadURL(storageRef);

      // 3. Actualizar el perfil del usuario con la URL del avatar
      await updateProfile(user, {
        displayName: values.displayName,
        photoURL,
      });

      console.log("Profile updated");

      // 4. Guardar la collection users en firestore
      const userDB: UserDB = {
        displayName: values.displayName,
        email: values.email,
        photoURL,
        uid: user.uid,
        friends: [],
        rooms: [],
      };

      const userDBRef = doc(db, "users", user.uid);
      await setDoc(userDBRef, userDB);

      console.log("UserDB created");
    } catch (error) {
      console.log(error);

      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        form.setError("email", {
          type: "manual",
          message: "Email already in use",
        });
        return;
      }

      console.log("Error creating user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Fill in the form below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User name</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Perez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photoURL"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <label className="bg-blue-500 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-blue-600">
                          Select file
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              setSelectedFile(file || null);
                              onChange(file); // Pasar el archivo al hook form
                            }}
                          />
                        </label>
                        <span className="ml-4 text-sm">
                          {selectedFile
                            ? selectedFile.name
                            : "No file chosen"}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
