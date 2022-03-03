export interface Eye {
    image_name: string,

    yes_1: number,
    cannot_grade_1: number,

    yes_2: number,
    cannot_grade_2: number,

    yes_3: number,
    cannot_grade_3: number,

    lower_2a: number,
    upper_2a: number,
    cannot_grade_2a: number,

    yes_5: number,
    cannot_grade_5: number,

    lower_8a: number,
    upper_8a: number,
    cannot_grade_8a: number,

    yes_7: number,
    cannot_grade_7: number,

    yes_8: number,
    cannot_grade_8: number,

    yes_9: number,
    cannot_grade_9: number,

    yes_10: number,
    cannot_grade_10: number,

    yes_11: number,
    cannot_grade_11: number,

    lower_2DD: number,
    lower_1DD: number,
    cannot_grade_DD: number,

    cataract: number,
    glaucoma: number,
    occlusion: number,
    maculopathy: number,
    other: number,
}