import { useState, useCallback } from 'react';
import { OnboardingBottomSheet } from './OnboardingBottomSheet';
import { DayTimePicker } from './DayTimePicker';
import { ReplenishLoading } from './ReplenishLoading';
import {
  ReplenishProductGrid,
  DEFAULT_ITEMS,
  type GridView,
  type ProductItem,
} from './ReplenishProductGrid';
import styles from './ReplenishOnboarding.module.css';

type OnboardingStep =
  | 'bottomSheet'
  | 'dayTimePicker'
  | 'loading'
  | 'productGrid';

export default function ReplenishOnboarding() {
  const [step, setStep] = useState<OnboardingStep>('bottomSheet');
  const [gridView, setGridView] = useState<GridView>('browse');
  const [selectedDay, setSelectedDay] = useState('Friday');
  const [selectedTime, setSelectedTime] = useState('4pm');
  const [items, setItems] = useState<ProductItem[]>(DEFAULT_ITEMS);

  const handleChangeDayTime = useCallback(() => {
    setStep('dayTimePicker');
  }, []);

  const handleSaveDayTime = useCallback((day: string, time: string) => {
    setSelectedDay(day);
    // Map abbreviated day to full day name
    const dayMap: Record<string, string> = {
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thur: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
    };
    setSelectedDay(dayMap[day] || day);
    // Extract the start time from the time range
    const startTime = time.split('–')[0] || time;
    setSelectedTime(startTime);
    setStep('bottomSheet');
  }, []);

  const handleViewUsuals = useCallback(() => {
    setStep('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setStep('productGrid');
    setGridView('browse');
  }, []);

  const handleClose = useCallback(() => {
    setStep('bottomSheet');
  }, []);

  const handleEdit = useCallback(() => {
    setGridView('edit');
  }, []);

  const handleSave = useCallback(() => {
    setGridView('browse');
  }, []);

  const handleAddToDelivery = useCallback(() => {
    setGridView('confirm');
  }, []);

  const handleConfirmWeekly = useCallback(() => {
    setGridView('terms');
  }, []);

  const handleDecline = useCallback(() => {
    setStep('bottomSheet');
  }, []);

  const handleAgree = useCallback(() => {
    // Completed — go back to bottomSheet or a success state
    setStep('bottomSheet');
  }, []);

  const handleUpdateItem = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  }, []);

  return (
    <div className={styles.page}>
      {/* Product grid / loading views are always mounted behind bottom sheets */}
      {step === 'loading' && (
        <ReplenishLoading
          deliveryDay={selectedDay}
          deliveryTime={selectedTime}
          onLoadingComplete={handleLoadingComplete}
        />
      )}

      {step === 'productGrid' && (
        <ReplenishProductGrid
          deliveryDay={selectedDay}
          deliveryTime={selectedTime}
          view={gridView}
          items={items}
          onClose={handleClose}
          onEdit={handleEdit}
          onAddToDelivery={handleAddToDelivery}
          onSave={handleSave}
          onConfirmWeekly={handleConfirmWeekly}
          onDecline={handleDecline}
          onAgree={handleAgree}
          onUpdateItem={handleUpdateItem}
        />
      )}

      {/* Bottom sheets overlay on top */}
      {step === 'bottomSheet' && (
        <OnboardingBottomSheet
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onChangeDayTime={handleChangeDayTime}
          onViewUsuals={handleViewUsuals}
        />
      )}

      {step === 'dayTimePicker' && (
        <DayTimePicker
          initialDay="Fri"
          initialTime="4pm–5pm"
          onSave={handleSaveDayTime}
        />
      )}
    </div>
  );
}
