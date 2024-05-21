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
      bgColor="secondary"
      color="primary"
      display="flex"
      alignItems="center"
      p="2"
      justifyContent="space-between"
    >
      <HStack>
        <Heading size="md">{title}</Heading>
        <Box marginLeft="10px">
          <Tooltip label="Add" aria-label="A tooltip">
            <IconButton
              icon={<FiPlus color="primary" />}
              aria-label={"Add"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "secondary_hover",
              }}
              isDisabled={add ? false : true}
              onClick={add ? () => add() : () => false}
            />
          </Tooltip>
          <Tooltip label="Smart Add" aria-label="A tooltip">
            <IconButton
              icon={<FiFilePlus color="primary" />}
              aria-label={"Smart Add"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "secondary_hover",
              }}
              isDisabled={smart ? false : true}
              onClick={smart ? () => smart() : () => false}
            />
          </Tooltip>
          <Tooltip label="Copy" aria-label="A tooltip">
            <IconButton
              icon={<FiCopy color="primary" />}
              aria-label={"Copy"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "secondary_hover",
              }}
              isDisabled={copy ? false : true}
              onClick={copy ? () => copy() : () => false}
            />
          </Tooltip>
          <Tooltip label="Delete" aria-label="A tooltip">
            <IconButton
              icon={<FiTrash2 color="primary" />}
              aria-label={"Delete"}
              disabled={true}
              bgColor="transparent"
              borderRadius="0px"
              height="40px"
              _hover={{
                bgColor: "secondary_hover",
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
            icon={<FiGrid color="primary" />}
            aria-label={"Excel"}
            bgColor="transparent"
            borderRadius="0px"
            height="40px"
            _hover={{
              bgColor: "secondary_hover",
            }}
            isDisabled={sheet ? false : true}
            onClick={sheet ? () => sheet() : () => false}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
