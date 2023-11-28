import { Modal, Box, Center, Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight, FaDoorClosed, FaDoorOpen, FaSearch } from "react-icons/fa";
const MyModal = ({ isOpen, onClose, onContinue }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} closeOnOverlayClick={false}>
        <ModalOverlay />
        <Center>
        <ModalContent mx="4" minHeight={"72vh"} text>
          <ModalHeader fontSize={18}> &#128075; Halo naki nakwai, sebelum masuk portal, lihat ini dulu ya!</ModalHeader>
          <ModalBody>
            <Box ml="4">
                <ul> 
                    <li><Text fontSize={13}>Di Portal Sumbawa anda bisa <b>Mencari Semua Produk/Jasa</b>, di kabupaten Sumbawa</Text></li>
                    <li><Text fontSize={13}>Jika data tidak tersedia, anda bisa minta tim Portal Sumbawa untuk mencarinya, <b>Gratis!</b></Text></li>
                    <li><Text fontSize={13}>Anda juga bisa menginputkan data sebagai penyedia jasa/produk melalui admin.</Text></li> 
                    <li><Text fontSize={13}>Itu saja, mohon maaf lahir batin, <b>Selamat Mencoba!</b></Text> </li>
                </ul>
            </Box>  
            </ModalBody>
          <ModalFooter>
            
            <Button width="full" fontSize="14" colorScheme="teal" rightIcon={<Text>&#128640;</Text>} onClick={onClose}>
             Oke Siap, Lanjut Buka Portal!
            </Button>

            {/* Add additional buttons or actions here */}
          </ModalFooter>
        </ModalContent>
        </Center>
      </Modal>
    );
  };
  
  export default MyModal;