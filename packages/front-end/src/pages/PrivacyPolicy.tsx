import {Anchor, Box, Container, Text, Title} from '@mantine/core'

/**
 * Privacy Policy page for Asukom -2025
 *
 * @Author Connor Gerrard
 */
export function PrivacyPolicy() {
  return (
    <Box bg="gray.3" mih="100vh">
      <Container p={20} size="md">
        <Title order={1} c="blue.6">
          Privacy Policy
        </Title>

        <Text size="md" fs="italic" mt={20}>
          Last updated: November 22, 2025
        </Text>

        <Text size="md" mt={20}>
          Asukom is a Mi'kmaq language learning application designed to help users learn vocabulary and play educational
          games. We respect your privacy and are committed to being transparent about how information is handled when
          you use our website.
        </Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          What information is collected
        </Title>
        <Text size="md">
          Asukom does not collect or store any personal information, cookies, or data from users for any purpose. Users
          can freely browse our website without any data being collected.
        </Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Use of cookies, log files and tracking
        </Title>
        <Text size="md">
          Asukom does not store any personal information as cookies or in log files. We do not use any tracking
          mechanisms.
        </Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Contact
        </Title>
        <Text size="md">
          If you have any questions or concerns about our privacy policy, feel free to contact us at{' '}
          <Anchor href="mailto:Asukom@gmail.com" underline="always" fw={500}>
            Asukom@gmail.com
          </Anchor>
          .
        </Text>
      </Container>
    </Box>
  )
}
