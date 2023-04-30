interface ModeConfigurationDTO {
  mode: ModeDTO;
  errors: ErrorDTO[];
  randomErrors: { count: number; sended: number };
  queriesResponses: PredefinedResponsesDTO;
}
