import React from 'react';
import { MapPartyMember } from './MapPartyMember';
import { Button, StyleSheet, Text, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { MapPartyMember as MapPartyMemberData } from '../data/MapPartyMember';

const styles = StyleSheet.create({
  listView: {
    flex: 3,
  },
  row: {
    flexDirection: 'row',
  },
});

export type MapPartyListProps = {
  members: MapPartyMemberData[];
  setMembers: (members: MapPartyMemberData[]) => void;
};

export function MapPartyList({
  members,
  setMembers,
}: MapPartyListProps): JSX.Element {
  const addMember = () => {
    setMembers([
      ...members,
      { key: uuidv4(), name: 'New Member', holes: [], totalMaps: 0 },
    ]);
  };
  return (
    <View style={styles.listView}>
      {members.length > 0 ? (
        members.map((member, index) => (
          <MapPartyMember
            key={member.key}
            member={member}
            setMember={newMember => {
              setMembers([
                ...members.slice(0, index - 1),
                newMember,
                ...members.slice(index + 1),
              ]);
            }}
          />
        ))
      ) : (
        <Text>Click on the + button to add a member!</Text>
      )}
      <Button title="+" onPress={addMember} />
    </View>
  );
}
