import { actionMenuEntriesComponentState } from '@/action-menu/states/actionMenuEntriesComponentState';
import { contextStoreCurrentObjectMetadataIdComponentState } from '@/context-store/states/contextStoreCurrentObjectMetadataIdComponentState';
import { contextStoreCurrentViewIdComponentState } from '@/context-store/states/contextStoreCurrentViewIdComponentState';
import { contextStoreCurrentViewTypeComponentState } from '@/context-store/states/contextStoreCurrentViewTypeComponentState';
import { contextStoreFiltersComponentState } from '@/context-store/states/contextStoreFiltersComponentState';
import { contextStoreNumberOfSelectedRecordsComponentState } from '@/context-store/states/contextStoreNumberOfSelectedRecordsComponentState';
import { contextStoreTargetedRecordsRuleComponentState } from '@/context-store/states/contextStoreTargetedRecordsRuleComponentState';
import { useRecoilCallback } from 'recoil';

export const useResetContextStoreStates = () => {
  const resetContextStoreStates = useRecoilCallback(({ set }) => {
    return (instanceId: string) => {
      set(
        contextStoreCurrentObjectMetadataIdComponentState.atomFamily({
          instanceId,
        }),
        null,
      );

      set(
        contextStoreTargetedRecordsRuleComponentState.atomFamily({
          instanceId,
        }),
        {
          mode: 'selection',
          selectedRecordIds: [],
        },
      );

      set(
        contextStoreNumberOfSelectedRecordsComponentState.atomFamily({
          instanceId,
        }),
        0,
      );

      set(
        contextStoreFiltersComponentState.atomFamily({
          instanceId,
        }),
        [],
      );

      set(
        contextStoreCurrentViewIdComponentState.atomFamily({
          instanceId,
        }),
        null,
      );

      set(
        contextStoreCurrentViewTypeComponentState.atomFamily({
          instanceId,
        }),
        null,
      );

      set(
        actionMenuEntriesComponentState.atomFamily({
          instanceId,
        }),
        new Map(),
      );
    };
  }, []);

  return { resetContextStoreStates };
};