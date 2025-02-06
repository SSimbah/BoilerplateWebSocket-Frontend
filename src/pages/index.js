import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
  FormLabel,
  FormControl
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "../components/validationSchemas/loginValidation.js";
import React, { useEffect } from "react";
import axios from 'axios';


const initialValues = {
  username: "",
  password: "",
};

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user) {
        router.push('/Dashboard');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  // If still loading or no user, don't render the dashboard
  if (isLoading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const handleSubmit = async (values) => {
    try {

      const response = await axios.post("http://localhost:5000/users/login", values);

      if (response.status !== 200) {
        throw new Error(response.data.message || "Login failed");
      }

      // Store user data in localStorage or state management solution
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      router.push("/Dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Could not connect to the server. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ maxHeight: "100vh", height: "100vh" }}>
        <Flex
          height="100vh"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Flex display={["none", "none", "flex"]} width="50%" height="100vh">
            <Image
              src="https://placehold.co/500x500"
              width="100%"
              fill={true}
              alt="logo-bg"
            />
          </Flex>
          <Flex
            p={["2.5","auto","auto"]}
            maxHeight="100vh"
            height={"100vh"}
            flex="1"
            justify="center"
            align="center"
          >
            <Box
              p="8"
              maxW="md"
              width="100%"
              bg="white"
              boxShadow="md"
              rounded="md"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
              >
                {({ errors }) => (
                  <Form>
                    <Heading mb={6} size="md">
                      Digital Grocery System
                    </Heading>
                    <FormControl>
                      <FormLabel mt="4">Username</FormLabel>
                      <Field name="username">
                        {({ field }) => (
                          <Input
                            {...field}
                            placeholder="Create your username"
                            padding={3}
                            borderRadius="md"
                            backgroundColor="gray.100"
                            width="100%"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="username" component={Text} color="red.500" />
                    </FormControl>
                    <FormControl>
                      <FormLabel mt="4">Password</FormLabel>
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            placeholder="Create your password"
                            type="password"
                            padding={3}
                            borderRadius="md"
                            backgroundColor="gray.100"
                            width="100%"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="password" component={Text} color="red.500" />
                    </FormControl>

                    <Button width="100%" mt="6" type="submit" colorScheme="green" color="white" mb="4">
                      Log in
                    </Button>
                    <Text textAlign="center">
                      Don&apos;t have an account?{" "}
                      <Link href="/register">
                        <Text
                          as="span"
                          color="green.400"
                          fontWeight="bold"
                          cursor="pointer"
                        >
                          Register Here
                        </Text>
                      </Link>
                    </Text>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
