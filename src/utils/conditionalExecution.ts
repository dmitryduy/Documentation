export const conditionalExecution = (condition: boolean, ifTrue: () => void, ifFalse: () => void) => {
  condition ? ifTrue() : ifFalse();
};