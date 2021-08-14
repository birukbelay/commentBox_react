export interface Answer {
    id?: string
    question: string
    answer: string
}

export interface CommentModel {
    key?: string;
    id?: string
    answers: Answer[]

    userName:string

    floor:string
    roomNo:string
    Desk:string

    date:string
    suggestion:string
}

export interface CommentState {
    comments?: CommentModel[],
    comment?: CommentModel | {},
    loadingStatus: string,
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}
