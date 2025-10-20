import {Button, Container, Paper, PasswordInput, Text, TextInput, Title} from '@mantine/core'
import {isNotEmpty, useForm} from '@mantine/form'
import {useState} from 'react'
import {useNavigate} from 'react-router'

import {api} from '@/api'

export function SigninPage() {
  // signin form with username and password fields
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: isNotEmpty('Username is required'),
      password: isNotEmpty('Password is required')
    }
  })

  const [failed, setFailed] = useState<boolean>(false)

  const navigate = useNavigate()

  const onSubmit = async (values: typeof form.values) => {
    // try to sign in with the provided username and password
    try {
      const {data} = await api.post('/auth', values)
      // if successful, store the returned token and navigate to the admin page
      localStorage.setItem('AuthToken', data.token)
      await navigate('/admin')
    } catch (error) {
      // if sign-in fails, show an error message
      setFailed(true)
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back</Title>
      <Paper withBorder shadow="sm" p="lg" mt="xl">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            withAsterisk
            key={form.key('username')}
            {...form.getInputProps('username')}
            mb="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            withAsterisk
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          {/* button is type=submit so that the form submits when clicked */}
          <Button type="submit" fullWidth mt="lg" radius="md">
            Sign in
          </Button>
        </form>
        {failed && (
          <Text c="red" size="sm" mt="md" ta="center">
            Invalid username or password
          </Text>
        )}
      </Paper>
    </Container>
  )
}
