import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import {usePuffStore} from '~/store'

export default function Screen() {
  const interval = usePuffStore(state => state.getPuffInterval())

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full max-w-sm p-6 rounded-2xl'>
        <CardContent>
          <View className='flex-row justify-around gap-3'>
            <View className='items-center'>
              <Text className='text-sm text-muted-foreground'>Interval</Text>
              <Text className='text-xl font-semibold'>{interval}</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter className='flex-col gap-3 pb-0'>
          <View />
          <Button
            variant='outline'
            className='shadow shadow-foreground/5'
          >
            <Text>Update</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
