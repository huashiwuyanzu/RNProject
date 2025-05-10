import React from 'react';
import {View, TextInput, Button, Text, ScrollView} from 'react-native';
import {useCreateTask} from '../hooks/create';
import {styles} from '../styles/create';

export default function CreateTaskScreen() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    handleSave,
  } = useCreateTask(undefined, () => {
    console.log('任务已保存！');
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="任务标题"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="任务描述（可选）"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>优先级：</Text>
      <View style={styles.priorityGroup}>
        {['high', 'medium', 'low'].map(p => (
          <Button
            key={p}
            title={p}
            onPress={() => setPriority(p as any)}
            color={priority === p ? 'blue' : 'gray'}
          />
        ))}
      </View>

      <Button title="保存任务" onPress={handleSave} />
    </ScrollView>
  );
}
