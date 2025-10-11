import { useState } from 'react';
import { Button, Group } from '@mantine/core';
import {CharacterCard} from '@/assets/Components/CharacterCard';

export function Game1(){
    const [showSelection, setShowSelection] = useState(false);
    return (
        <>
            <div>Game1's page!</div>
            <Button mt="md" radius="md" onClick={() => setShowSelection(true)}>
                Play (invokes character selection)
            </Button>
            {showSelection && (
                <Group>
                    <CharacterCard />
                    <CharacterCard />
                    <CharacterCard />
                </Group>
            )}
        </>
    );
}