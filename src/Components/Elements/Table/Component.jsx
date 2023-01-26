import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function Component({ dataFormat, listData }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {dataFormat.map((format) => (
              <Th key={format.name}><Text>{format.name}</Text></Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {listData.map((article, index) => (
            <Tr key={index}>
              {dataFormat.map((format) => (
                <Td key={format.name}>{article[format.schema]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
