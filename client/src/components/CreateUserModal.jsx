import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiAddToQueue } from 'react-icons/bi'

const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Mi compa nuevo</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        {/* Izquierda */}
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder='nombre completo' />
                        </FormControl>
                        {/* Derecha */}
                        <FormControl>
                            <FormLabel>Ocupacion</FormLabel>
                            <Input placeholder='Empresario, empleado, Nini' />
                        </FormControl>

                    </Flex>
                    <FormControl>
                        <FormLabel>descripcion</FormLabel>
                        <Textarea
                            resize={"none"}
                            overflowY={"hidden"}
                            placeholder='Ingeniero de software emprendedor . . .'

                        />
                    </FormControl>
                    <RadioGroup defaultValue='male' mt={4}>
                        <Flex gap={5}>
                            <Radio value='male'>Male</Radio>
                            <Radio value='female' colorScheme='pink'>Female</Radio>

                        </Flex>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Add
                    </Button>
                    <Button onClick={onClose} colorScheme='orange'>
                        Cancel
                    </Button>

                </ModalFooter>

            </ModalContent>

        </Modal>
    </>
}

export default CreateUserModal