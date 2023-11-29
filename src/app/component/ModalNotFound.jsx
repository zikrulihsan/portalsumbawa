import { Modal, Box, Center, Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight, FaDoorClosed, FaDoorOpen, FaSearch } from "react-icons/fa";
const ModalNotFound = ({ isOpen, onClose, onContinue }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} closeOnOverlayClick={false}>
        <ModalOverlay />
        <Center>
        <ModalContent mx="4" minHeight={"30vh"} text>
          <ModalHeader fontSize={16}>&#9888; Data belum tersedia di Web Portal Sumbawa, tapi...</ModalHeader>
          <ModalBody>
            <Box>
                <Text fontSize={14}><b>Jangan khawatir!</b> Tim Portal Sumbawa akan membantu anda menemukan data yang anda butuhkan di luar Portal Sumbawa.</Text>
            </Box>  
            </ModalBody>
          <ModalFooter flexDirection={"column"} gap="3">
            
            <Button width="full" fontSize="14" size="sm" colorScheme="teal" rightIcon={<FaArrowRight/>} onClick={onContinue}>
              Cari Via Tim Portal, Gratis!
            </Button>
            <Button width="full" textDecoration={"underline"} variant="link" fontSize="14" colorScheme="teal" rightIcon={<FaSearch/>} onClick={onClose}>
              Lanjut Cari Di Web
            </Button>

            {/* Add additional buttons or actions here */}
          </ModalFooter>
        </ModalContent>
        </Center>
      </Modal>
    );
  };
  
  export default ModalNotFound;