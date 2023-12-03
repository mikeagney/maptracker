import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapPartyMember as MapPartyMemberData } from '../data/MapPartyMember';
import { EditableText } from './EditableText';

const baseStyle = StyleSheet.create({
  col: {
    padding: 10,
  },
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameCol: {
    ...baseStyle.col,
    width: 400,
  },
  totalsCol: {
    ...baseStyle.col,
    width: 50,
  },
  floorsCol: {
    ...baseStyle.col,
    width: 300,
  },
});

export type MapPartyMemberProps = {
  member: MapPartyMemberData;
  isEditingName?: boolean;
  setMember: (newMember: MapPartyMemberData) => void;
};

export function MapPartyMember({
  member,
  setMember,
}: MapPartyMemberProps): JSX.Element {
  const { name, holes, totalMaps } = member;
  const totalHoles = holes.length;
  return (
    <View style={styles.row}>
      <View style={styles.nameCol}>
        <EditableText
          value={name}
          onChangeText={newText => setMember({ ...member, name: newText })}
        />
      </View>
      <View style={styles.totalsCol}>
        <Text>
          {totalHoles}/{totalMaps}
        </Text>
      </View>
      <View style={styles.floorsCol}>
        <Text>
          {holes.map((hole, index) => (
            <Text key={index}>
              {index > 0 ? ', ' : ''}
              {hole}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
}
