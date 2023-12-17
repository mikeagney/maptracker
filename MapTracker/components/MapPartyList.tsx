import React from 'react';
import { MapPartyMember } from './MapPartyMember';
import { Button, StyleSheet, Text, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { MapPartyMember as MapPartyMemberData } from '../data/MapPartyMember';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <View
            key={member.key}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            {index > 0 ? (
              <Pressable
                onPress={() => {
                  setMembers([
                    ...members.slice(0, index - 1),
                    member,
                    members[index - 1],
                    ...members.slice(index + 1),
                  ]);
                }}>
                <Icon name="arrow-up-circle-outline" size={24} />
              </Pressable>
            ) : (
              <Icon name="ellipse-outline" size={24} />
            )}
            {index + 1 < members.length ? (
              <Pressable
                onPress={() => {
                  setMembers([
                    ...members.slice(0, index),
                    members[index + 1],
                    member,
                    ...members.slice(index + 2),
                  ]);
                }}>
                <Icon name="arrow-down-circle-outline" size={24} />
              </Pressable>
            ) : (
              <Icon name="ellipse-outline" size={24} />
            )}
            <Pressable
              onPress={() =>
                setMembers([
                  ...members.slice(0, index),
                  ...members.slice(index + 1),
                ])
              }>
              <Icon name="trash-outline" size={24} />
            </Pressable>
            <MapPartyMember
              member={member}
              setMember={newMember => {
                setMembers([
                  ...members.slice(0, index),
                  newMember,
                  ...members.slice(index + 1),
                ]);
              }}
            />
          </View>
        ))
      ) : (
        <Text style={{ margin: 5 }}>
          Click on the + button to add a member!
        </Text>
      )}
      <Button title="+" onPress={addMember} />
    </View>
  );
}
