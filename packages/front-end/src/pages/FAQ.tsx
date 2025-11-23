import {Box, Container, Text, Title} from '@mantine/core'

export function FAQ() {
  return (
    <Box bg="gray.3" mih="100vh">
      <Container p={20} size="md">
        <Title order={1} c="blue.6">
          Frequently Asked Questions
        </Title>

        <Title order={2} pt={20} pb={20} fw={600} fs="italic" c="blue.6">
          How do I add words as administrator.
        </Title>
        <Text size="md">Enter Tutorial Here</Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          What is Asukom?
        </Title>
        <Text size="md">
          Asukom is a Mi'kmaq language learning app designed to help users learn vocabulary through a dictionary feature
          and interactive educational games.
        </Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Do I need an account to use Asukom?
        </Title>
        <Text size="md">No. All features of Asukom are fully available without creating an account or logging in.</Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Are there ads or third-party trackers?
        </Title>
        <Text size="md">No. Asukom does not use ads, analytics tools, or any third-party tracking mechanisms.</Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          How accurate are the Mi'kmaq translations?
        </Title>
        <Text size="md">
          All vocabulary is sourced from verified Mi'kmaq language resources. Some variations may exist depending on
          dialect and community.
        </Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Do the games save my progress?
        </Title>
        <Text size="md">No. The games are simple learning tools and do not store or track progress.</Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Is Asukom free to use?
        </Title>
        <Text size="md">Yes. All features of Asukom are available for free.</Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Who is this app intended for?
        </Title>
        <Text size="md">
          Asukom is for anyone interested in learning or practicing Mi'kmaq vocabulary, regardless of age or skill
          level.
        </Text>

        <Title order={2} pt={40} pb={20} fw={600} fs="italic" c="blue.6">
          Why is there an admin login page?
        </Title>
        <Text size="md">
          The admin page is used only by authorized maintainers to update word lists and manage content. Regular users
          do not need to access it.
        </Text>
      </Container>
    </Box>
  )
}
