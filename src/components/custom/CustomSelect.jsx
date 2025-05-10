import { Portal, Select } from '@chakra-ui/react';
import React from 'react';

const CustomSelect = ({ setGateway, text, collection }) => {
    return (
        <Select.Root
            collection={collection}
            size="sm"
            width="320px"
            onValueChange={(value) => setGateway(value?.value[0])}
        >
            <Select.HiddenSelect />
            <Select.Label>{text}</Select.Label>
            <Select.Control
                backgroundColor="white"
                borderStyle={'solid'}
                borderWidth={'thin'}
                paddingX="2"
                fontSize={'xs'}
                borderRadius={'md'}
            >
                <Select.Trigger>
                    <Select.ValueText placeholder="Select gateway" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {collection?.items?.map((gateway) => (
                            <Select.Item item={gateway} key={gateway.value}>
                                {gateway.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
};

export default CustomSelect;
