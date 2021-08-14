export interface QuestionModel {
    id?: string
    question: string
    isRequired: boolean
}

export interface QuestionState {
    questions?: QuestionModel[],
    question?: QuestionModel | {},
    loadingStatus: string,
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}
