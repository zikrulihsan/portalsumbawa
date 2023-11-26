import { Modal, Box, Center, Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight, FaDoorClosed, FaDoorOpen, FaSearch } from "react-icons/fa";
const MyModal = ({ isOpen, onClose, onContinue }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} closeOnOverlayClick={false}>
        <ModalOverlay />
        <Center>
        <ModalContent mx="4" height={"72vh"} text>
          <ModalHeader fontSize={18}> &#128075; Halo naki nakwai, sebelum masuk portal, lihat ini dulu ya!</ModalHeader>
          <ModalBody>
            <Box ml="4">
                <ul> 
                    <li><Text fontSize={13}>Saat ini Tim Portal Sumbawa Sedang melakukan <b>Gerakan Satu Data Sumbawa</b>, mengumpulkan berbagai data penyedia jasa/produk di Sumbawa</Text></li>
                    <li><Text fontSize={13}>Data yang tersedia di dalam Portal masih jauh dari cukup, anda bisa berpartisipasi sebagai pelaku usaha ataupun pengguna</Text></li>
                    <li><Text fontSize={13}>Anda bisa menginputkan data sebagai penyedia jasa/produk melalui admin</Text></li>
                    <li><Text fontSize={13}>Sebagai Pengguna, data yang anda cari mungkin masih belum tersedia, Anda bisa memberitahu admin tentang pencarian anda.</Text></li> 
                    <li><Text fontSize={13}>Admin akan mengutamakan pelengkapan data dari daftar pencarian pengguna tersebut</Text> </li>
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