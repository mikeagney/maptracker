import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCol: { width: '30%', paddingRight: 5 },
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
      <View style={styles.buttonCol}>
        {state.isEditing ? (
          <View style={{ flexDirection: 'row' }}>
            <Button
              title="Save"
              onPress={() => {
                setState({ ...state, isEditing: false });
                onChangeText(state.currentValue);
              }}
            />
            <Button
              title="Revert"
              onPress={() =>
                setState({ isEditing: false, currentValue: value })
              }
            />
          </View>
        ) : (
          <Button
            title="Edit"
            onPress={() => setState({ ...state, isEditing: true })}
          />
        )}
      </View>
      <View style={styles.textCol}>
        <TextInput
          value={state.currentValue}
          editable={state.isEditing}
          onChangeText={text => setState({ ...state, currentValue: text })}
        />
      </View>
    </View>
  );
}
