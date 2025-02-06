import Head from "next/head";
import { Box, Flex, Input, Button, Text, Heading, useToast, Image, Select, FormControl, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidation } from "../components/validationSchemas/signupValidation";
import { useRouter } from "next/router";
import axios from 'axios';



const initialValues = {
  role: "",
  username: "",
  email: "",
  password: "",
};

const roleOptions = [
  { label: "Customer", value: "Customer" },
  { label: "Vendor", value: "Vendor" },
];

export default function Register() {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/users", values);

      if (response.status !== 200) {
        // const errorData = await response.json();
        throw new Error(response.message || "Registration failed");
      }

      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Registration failed",
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
        <title>Register</title>
        <meta name="description" content="Register for an account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ maxHeight: "100vh", height: "100vh" }}>
        <Flex height="100vh" width="100%" alignItems="center" justifyContent="center">
          <Flex display={["none", "none", "flex"]} width="50%" height="100vh">
            <Image src="https://placehold.co/100" width="100%" fill={true} alt="logo-bg" />
          </Flex>
          <Flex
            maxHeight="100vh"
            height={"100vh"}
            flex="1"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              p="8"
              maxW="md"
              width="100%"
              bgColor="white"
              boxShadow="md"
              rounded="lg"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={signupValidation}
                onSubmit={handleSubmit}
              >
                {({ errors }) => (
                  <Form>
                    <Heading mb={6} size="md">
                      Digital Grocery System
                    </Heading>

                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <Field name="role">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select a role"
                            variant="filled"
                            size="md"
                            colorScheme="blue"
                          >
                            {roleOptions.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage name="role" component={Text} color="red.500" />
                    </FormControl>

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
                      <FormLabel mt="4">Email</FormLabel>
                      <Field name="email">
                        {({ field }) => (
                          <Input
                            {...field}
                            placeholder="Create your email"
                            padding={3}
                            borderRadius="md"
                            backgroundColor="gray.100"
                            width="100%"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="email" component={Text} color="red.500" />
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
                      Register
                    </Button>
                    <Text textAlign="center">
                      Already have an account?{" "}
                      <Link href="/">
                        <Text as="span" color="green.400" fontWeight="bold" cursor="pointer">
                          Log in
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
