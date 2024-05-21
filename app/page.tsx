"use client";

import FileUploadForm from "@/components/FileUploadForm";
import { HomeNav } from "@/components/HomeNav";
import { NumberPoint } from "@/components/NumberPoint";
import {
  Box,
  Center,
  Text,
  Heading,
  VStack,
  Button,
  HStack,
  Hide,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const FileUploadSection = () => {
  return (
    <Center style={{ marginTop: "80px", marginBottom: "80px" }}>
      <VStack color="primary">
        <Heading size="sm" fontFamily="mono" fontWeight="400">
          Building an ecosystem for
        </Heading>
        <Heading size="xl" fontWeight="400">
          Real Estate Modeling in Minutes
        </Heading>
        <FileUploadForm />
      </VStack>
    </Center>
  );
};

const ThesisSection = () => {
  return (
    <Box
      bgColor="secondary"
      padding="20px"
      paddingLeft="40px"
      paddingRight="40px"
      paddingBottom="0px"
      display="flex"
      justifyContent="space-between"
      zIndex={-1}
    >
      <Box>
        <Heading fontWeight="400">What I'm doing (a thesis)</Heading>
        <Text fontFamily="mono" color="gray_dark" marginTop="10px">
          UNDERWAY
        </Text>
        <NumberPoint
          number={1}
          fill={true}
          heading="Make rent roll easy"
          subtext="Test"
        />
        <Text fontFamily="mono" color="gray_dark">
          COMING SOON
        </Text>
        <NumberPoint
          number={2}
          fill={false}
          heading="Provide RE modeling insights with data"
          subtext="Test"
        />
        <NumberPoint
          number={3}
          fill={false}
          heading="Streamline RE modeling at large"
          subtext="Test"
        />
      </Box>
      <Hide breakpoint="(max-width: 840px)">
        <HStack gap="50px">
          <motion.div
            initial={{ y: 200 }}
            whileInView={{ y: 30 }}
            transition={{ ease: "linear", duration: 1 }}
          >
            <img src="/ExcelTower1.svg" style={{ height: "300px" }} />
          </motion.div>
          <motion.div
            initial={{ y: 300 }}
            whileInView={{ y: 30 }}
            transition={{ ease: "linear", duration: 1, delay: 0.25 }}
          >
            <img src="/ExcelTower2.svg" style={{ height: "300px" }} />
          </motion.div>
        </HStack>
      </Hide>
    </Box>
  );
};

export const AboutSection = () => {
  return (
    <Box
      bgColor="primary"
      padding="20px"
      paddingLeft="40px"
      paddingRight="40px"
      height="400px"
    >
      About
    </Box>
  );
};

export default function Home() {
  return (
    <Box>
      <HomeNav />
      <FileUploadSection />
      <ThesisSection />
      <AboutSection />
    </Box>
  );
}
