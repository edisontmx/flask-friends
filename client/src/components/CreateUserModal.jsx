import { useToast } from '@chakra-ui/react'
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { BASE_URL } from '../App'

const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsloading] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: "",
    })
    const toast = useToast()
    const handleCreateUser = async (e) => {
        e.preventDefault(); //evita que la pagina recargue
        setIsloading(true)
        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error)
            }
            toast({
                status: "success",
                title: "Amigo agregado",
                description: "Un amigo ha sido agregado",
                duration: 2000,
                position: "top-center",
            })
            onClose();
            setUsers((prevUsers) => [...prevUsers, data])

            setInputs({
                name: "",
                role: "",
                description: "",
                gender: "",
            })//limpiar inputs

        } catch (error) {
            toast({
                status: "error",
                title: "No se pudo agregar",
                description: error.message,
                duration: 4000,

            })
        } finally {
            setIsloading(false)
            
        }
    }

    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <form onSubmit={handleCreateUser}>
                <ModalContent>
                    <ModalHeader>Mi compa nuevo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            {/* Izquierda */}
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input placeholder='nombre completo'
                                    value={inputs.name}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                />
                            </FormControl>
                            {/* Derecha */}
                            <FormControl>
                                <FormLabel>Ocupacion</FormLabel>
                                <Input placeholder='Empresario, empleado, Nini'
                                    value={inputs.role}
                                    onChange={(e) => setInputs({ ...inputs, role: e.target.value })} />
                            </FormControl>

                        </Flex>
                        <FormControl>
                            <FormLabel>descripcion</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder='Ingeniero de software emprendedor . . .'
                                value={inputs.description}
                                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}

                            />
                        </FormControl>
                        <RadioGroup mt={4}>
                            <Flex gap={5}>
                                <Radio value='male'
                                    onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                >Male</Radio>
                                <Radio value='female' colorScheme='pink'
                                    onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                >Female</Radio>

                            </Flex>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit'
                            isLoading={isLoading}
                        >
                            Add
                        </Button>
                        <Button onClick={onClose} colorScheme='orange'>
                            Cancel
                        </Button>

                    </ModalFooter>

                </ModalContent>
            </form>

        </Modal>
    </>
}

export default CreateUserModal