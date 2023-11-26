import { Modal, Box, Center, Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
const MyModal = ({ isOpen, onClose, onContinue }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} closeOnOverlayClick={false}>
        <ModalOverlay />
        <Center>
        <ModalContent mx="4"  text>
          <ModalHeader fontSize={18}>Masih tidak menemukan data yang anda cari?</ModalHeader>
          <ModalBody>
            <Text fontSize={14}>Minta Tim Portal Sumbawa untuk membantu anda mencarinya di luar platform Portal Sumbawa.*</Text>
            <Text fontSize={10} mt="2" color="brown">*Data di Portal Sumbawa akan terus diperbarui berdasarkan rekomendasi dan kebutuhan anda.</Text>
          </ModalBody>
          <ModalFooter>
            <Box>
            <Button width="full" fontSize="14" colorScheme="teal" rightIcon={<FaArrowRight/>} onClick={onContinue}>
              Minta Bantuan Tim Portal, Gratis!
            </Button>
            <Button width="full" textDecoration={"underline"} mt="2" variant="link" fontSize="14" colorScheme="teal" color="teal" rightIcon={<FaSearch/>} onClick={onClose}>
              Tetap di Web Portal
            </Button>
            </Box>
            {/* Add additional buttons or actions here */}
          </ModalFooter>
        </ModalContent>
        </Center>
      </Modal>
    );
  };
  
  export default MyModal;