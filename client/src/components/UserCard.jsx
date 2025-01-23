import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const toast= useToast()

  const handleDeleteUser = async () => {
    try {
      const res= await fetch(BASE_URL + "/friends/" + user.id,{
        method:"DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error)
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
      toast({

        title: "Borrado correcto",
        status: "success",
        description: "Tu amigo ha sido borrado",
        duration: 2000,
        isClosable: true,
        position: "top-center",
      }
      )
    } catch (error) {
      toast({
        title: "Error al intentar borrar a tu amigo",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center"
      })
    }
  }

  return (

    <Card>
      <CardHeader>
        <Flex>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={user.imgUrl}/>
            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>
          <EditModal
            user={user}
            setUsers={setUsers}
          
          />
          <Flex>
            <IconButton
              variant={"ghost"}
              colorScheme="yellow"
              size={"sm"}
              aria-label="ver Opciones"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
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