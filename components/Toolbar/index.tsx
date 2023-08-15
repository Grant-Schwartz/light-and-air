"use client";

import { Box, HStack, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import { FiCopy, FiFilePlus, FiGrid, FiPlus, FiTrash2 } from "react-icons/fi";

interface ToolbarProps {
  title: string;
  add?: () => void;
  smart?: () => void;
  copy?: () => void;
  del?: () => void | undefined;
  sheet?: () => void;
}

export default function Toolbar({
  title,
  add,
  smart,
  copy,
  del,
  sheet,
}: ToolbarProps) {
  return (
    <Box
      w="100%"
      h="40px"
      bgColor="gray.700"
      color="white"
      display="flex"
      alignItems="center"
      p="2"
      justifyContent="space-between"
    >
      <HStack>
        <Heading size="md" fontWeight="bold" letterSpacing="-0.05em">
          {title}
        </Heading>
        <Box marginLeft="10px">
          <Tooltip label="Add" aria-label="A tooltip">
            <IconButton
              icon={<FiPlus color="white" />}
              aria-label={"Add"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "gray.800",
              }}
              isDisabled={add ? false : true}
              onClick={add ? () => add() : () => false}
            />
          </Tooltip>
          <Tooltip label="Smart Add" aria-label="A tooltip">
            <IconButton
              icon={<FiFilePlus color="white" />}
              aria-label={"Smart Add"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "gray.800",
              }}
              isDisabled={smart ? false : true}
              onClick={smart ? () => smart() : () => false}
            />
          </Tooltip>
          <Tooltip label="Copy" aria-label="A tooltip">
            <IconButton
              icon={<FiCopy color="white" />}
              aria-label={"Copy"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "gray.800",
              }}
              isDisabled={copy ? false : true}
              onClick={copy ? () => copy() : () => false}
            />
          </Tooltip>
          <Tooltip label="Delete" aria-label="A tooltip">
            <IconButton
              icon={<FiTrash2 color="white" />}
              aria-label={"Delete"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "gray.800",
              }}
              isDisabled={del ? false : true}
              onClick={del ? () => del() : () => false}
            />
          </Tooltip>
        </Box>
      </HStack>
      <Box>
        <Tooltip label="Excel View" aria-label="A tooltip">
          <IconButton
            icon={<FiGrid color="white" />}
            aria-label={"Excel"}
            bgColor="transparent"
            borderRadius="0px"
            height="40px"
            _hover={{
              bgColor: "gray.800",
            }}
            isDisabled={sheet ? false : true}
            onClick={sheet ? () => sheet() : () => false}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
