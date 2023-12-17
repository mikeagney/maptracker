/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { MapPartyList } from './components/MapPartyList';
import { MapPartyMember } from './data/MapPartyMember';
import { Colors } from './components/Colors';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const { foreground } = Colors();
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: foreground,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { background, backgroundDim } = Colors();

  const backgroundStyle = {
    backgroundColor: backgroundDim,
  };

  const [members, setMembers] = useState(
    () =>
      [
        {
          key: uuidv4(),
          name: 'Mimithi Mithi',
          holes: [1, 3],
          totalMaps: 3,
        },
      ] as MapPartyMember[],
  );

  let totalMaps = 0;
  let totalHoles = 0;
  let totalFloors = 0;

  members.forEach(member => {
    totalMaps += member.totalMaps;
    totalHoles += member.holes.length;
    totalFloors += member.holes.reduce(
      (floorCount, hole) => floorCount + hole,
      0,
    );
  });

  const floorRate = totalMaps === 0 ? 0.0 : (totalHoles * 100) / totalMaps;

  const formattedMembers = `## Individual stats
${members
  .map(
    ({ name, holes, totalMaps }) =>
      `${name}: ${holes.length}/${totalMaps} ${
        holes.length === 0 ? '' : `(${holes.join(', ')})`
      }`,
  )
  .join('\n')}

## Totals
Total holes: ${totalHoles} (${floorRate.toFixed(2)}%)
Total floors: ${totalFloors}
`;
  let markdownTextRef: TextInput | null;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: background,
          }}>
          <Section title="Map Party">
            <MapPartyList members={members} setMembers={setMembers} />
          </Section>
        </View>
        <View
          style={{
            backgroundColor: background,
            flex: 1,
          }}>
          <TextInput
            ref={ref => (markdownTextRef = ref)}
            style={{ fontFamily: 'ui-monospace' }}
            selectTextOnFocus={true}
            multiline={true}
            value={formattedMembers}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
