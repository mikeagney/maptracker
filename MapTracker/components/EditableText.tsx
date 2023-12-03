import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCol: { paddingLeft: 5 },
  textCol: { flex: 1 },
});

export type EditableTextProps = {
  value: string;
  onChangeText: (newText: string) => void;
};

type EditableTextState = {
  isEditing: boolean;
  currentValue: string;
};

export function EditableText({
  value,
  onChangeText,
}: EditableTextProps): JSX.Element {
  const [state, setState] = useState(
    (): EditableTextState => ({
      isEditing: false,
      currentValue: value,
    }),
  );
  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        <TextInput
          value={state.currentValue}
          editable={state.isEditing}
          onFocus={() => setState({ ...state, isEditing: true })}
          onChangeText={text => setState({ ...state, currentValue: text })}
        />
      </View>
      <View style={styles.buttonCol}>
        {state.isEditing && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={() => {
                setState({ ...state, isEditing: false });
                onChangeText(state.currentValue);
              }}>
              <Icon name="save-outline" size={24} accessibilityLabel="Save" />
            </Pressable>
            <Pressable
              onPress={() =>
                setState({ isEditing: false, currentValue: value })
              }>
              <Icon
                name="arrow-undo-outline"
                size={24}
                accessibilityLabel="Revert"
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
