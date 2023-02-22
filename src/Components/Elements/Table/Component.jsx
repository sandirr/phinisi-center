import React from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Component({
  dataFormat,
  listData,
  hasMoreItems,
  handleLoadMore,
  isLoading,
}) {
  return (
    <TableContainer>
      <InfiniteScroll
        dataLength={listData.length}
        hasMore={hasMoreItems}
        next={handleLoadMore}
        // loader={<Box>Loading...</Box>}
      >
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
      </InfiniteScroll>
      {isLoading && <Box>Loading...</Box>}
    </TableContainer>
  );
}
