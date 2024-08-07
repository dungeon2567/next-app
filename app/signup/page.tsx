import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import Link from 'next/link';
  
  export default function AuthenticationPage() {
    return (
      <Container size={420} my={40}>
        <Title ta="center">
          Sign up to MyApp
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor component={Link} size="sm" href="/signin">
            Login
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Button fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </Container>
    );
  }