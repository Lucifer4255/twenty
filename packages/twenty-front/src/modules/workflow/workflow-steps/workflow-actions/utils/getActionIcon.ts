import { OTHER_ACTIONS } from '@/workflow/workflow-steps/workflow-actions/constants/OtherActions';
import { RECORD_ACTIONS } from '@/workflow/workflow-steps/workflow-actions/constants/RecordActions';

export const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case 'CREATE_RECORD':
    case 'UPDATE_RECORD':
    case 'DELETE_RECORD':
      return RECORD_ACTIONS.find((item) => item.type === actionType)?.icon;
    default:
      return OTHER_ACTIONS.find((item) => item.type === actionType)?.icon;
  }
};