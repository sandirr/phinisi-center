import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { callFunc } from '../../../../../Configs/firebase';

export default function Component({ vendor, onClose }) {
  const getOrders = async () => {
    const callable = callFunc('getOrders');

    await callable({
      vendorId: vendor?.id,
      limit: 10,
      page: 1,
    }).then(() => {
      // console.log('data', res);
    });
  };

  useEffect(() => {
    if (vendor?.id) {
      getOrders();
    }
  }, [vendor]);

  return (
    <Drawer onClose={onClose} isOpen={!!vendor} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Pesanan Vendor:
          {' '}
          {vendor?.name}
        </DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Consequat nisl vel pretium lectus quam id. Semper quis lectus
            nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
            quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
            magna eget est lorem. Erat imperdiet sed euismod nisi porta.
            Lectus vestibulum mattis ullamcorper velit.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
