export interface Poll {
    owner: string,
    voter: string[],
    question: string,
    options: PollOption[],
    id?: string
}

export interface PollOption {
    option: string,
    votes: number
}