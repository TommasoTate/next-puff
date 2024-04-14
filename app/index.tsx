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
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Screen() {
  const intervals = usePuffStore(state => state.getPuffIntervals())
  const nextPuffTime = usePuffStore(state => state.getNextPuffTime())
  const incrementDailyPuffsCount = usePuffStore(state => state.incrementDailyPuffsCount)
  const reset = usePuffStore(state => state.reset)

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full max-w-sm p-6 rounded-2xl'>
        <CardContent>
          <View className='flex-row justify-around gap-3'>
            <View className='items-center'>
              {
                intervals.map((interval, index) => (
                  <Text key={index}>{interval.format('HH:mm')}</Text>
                ))
              }
              <Text>Next puff at {nextPuffTime.format('HH:mm')}</Text>
              <Text>Puffs count: {usePuffStore(state => state.dailyPuffsCount)}</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter className='flex-col gap-3 pb-0'>
          <Button
            variant='outline'
            className='shadow shadow-foreground/5'
            onPress={incrementDailyPuffsCount}
          >
            <Text>Update</Text>
          </Button>
          <Button
              onPress={reset}
          >
            <Text>Reset</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
