import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
const UserCard = ({ user }) => {
  return (

    <Card>
      <CardHeader>
        <Flex>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src="https://avatar.iran.liara.run/public" />
            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>
          <EditModal/>
          <Flex>
            <IconButton
              variant={"ghost"}
              colorScheme="yellow"
              size={"sm"}
              aria-label="ver Opciones"
              icon={<BiTrash size={20} />}
            />

          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  )

}

export default UserCard