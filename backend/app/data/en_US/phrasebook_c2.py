"""American English phrasebook — C2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="rhetoric_c2",
        level="C2",
        situation="Rhetoric & Persuasion",
        icon="\u2696\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="It would be remiss of us not to acknowledge that...",
                context="Formally recognising a point",
                register="formal",
            ),
            PhrasebookEntry(
                text="The crux of the matter is...",
                context="Getting to the heart of the issue",
                register="formal",
            ),
            PhrasebookEntry(
                text="Far from being a setback, this represents an opportunity.",
                context="Reframing a negative as a positive",
                register="formal",
            ),
            PhrasebookEntry(
                text="It stands to reason that...",
                context="Presenting something as logical",
                register="formal",
            ),
            PhrasebookEntry(
                text="One cannot overstate the importance of...",
                context="Emphasising significance",
                register="formal",
            ),
            PhrasebookEntry(
                text="The time has come to reconsider our approach.",
                context="Calling for change",
                register="formal",
            ),
            PhrasebookEntry(
                text="Not only does this fail to address the root cause, but it also...",
                context="Compounding criticism",
                register="formal",
            ),
            PhrasebookEntry(
                text="This raises the question: why has nothing been done?",
                context="Rhetorical challenge — note: 'begs the question' is technically a logical fallacy (petitio principii) in formal academic contexts, not a synonym for 'raises the question'",
                register="formal",
            ),
            PhrasebookEntry(
                text="In the final analysis, ...",
                context="Drawing a definitive conclusion",
                register="formal",
            ),
            PhrasebookEntry(
                text="We would do well to remember that...",
                context="Offering wise counsel",
                register="formal",
            ),
            PhrasebookEntry(
                text="There is an inescapable irony in the fact that...",
                context="Pointing out contradiction or irony",
                register="formal",
            ),
            PhrasebookEntry(
                text="The evidence speaks for itself.",
                context="Allowing evidence to make the argument",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="nuanced_discourse_c2",
        level="C2",
        situation="Nuanced Discourse & Hedging",
        icon="\U0001f52c",
        phrases=[
            PhrasebookEntry(
                text="It is worth noting, albeit with some caution, that...",
                context="Careful, hedged observation",
                register="formal",
            ),
            PhrasebookEntry(
                text="The picture is, of course, considerably more complex.",
                context="Signalling complexity",
                register="formal",
            ),
            PhrasebookEntry(
                text="Suffice it to say that...",
                context="Indicating something is enough without elaborating",
                register="formal",
            ),
            PhrasebookEntry(
                text="This is not to suggest that..., but rather...",
                context="Clarifying a potential misinterpretation",
                register="formal",
            ),
            PhrasebookEntry(
                text="The extent to which this holds true varies considerably.",
                context="Qualifying a generalisation",
                register="formal",
            ),
            PhrasebookEntry(
                text="I would be the first to admit that...",
                context="Honest concession",
                register="formal",
            ),
            PhrasebookEntry(
                text="Taken in isolation, this fact is misleading.",
                context="Warning about context",
                register="formal",
            ),
            PhrasebookEntry(
                text="There is a fine line between X and Y.",
                context="Drawing a subtle distinction",
                register="formal",
            ),
            PhrasebookEntry(
                text="The jury is still out on whether...",
                context="Saying something is not yet resolved",
                register="neutral",
            ),
            PhrasebookEntry(
                text="One is hard-pressed to find a compelling counter-argument.",
                context="Strong (but hedged) assertion",
                register="formal",
            ),
            PhrasebookEntry(
                text="This warrants further investigation.",
                context="Flagging something needs more research",
                register="formal",
            ),
            PhrasebookEntry(
                text="At the risk of oversimplifying, ...",
                context="Pre-empting a reductionism critique",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="legal_contractual_c2",
        level="C2",
        situation="Legal & Contractual Language",
        icon="\U0001f4dc",
        phrases=[
            PhrasebookEntry(
                text="The terms set out herein are binding upon both parties.",
                context="Formal contract phrasing",
                register="formal",
            ),
            PhrasebookEntry(
                text="Notwithstanding the foregoing, ...",
                context="Introducing a qualification to a prior statement",
                register="formal",
            ),
            PhrasebookEntry(
                text="The party of the first part hereby agrees to...",
                context="Initiating a formal obligation",
                register="formal",
            ),
            PhrasebookEntry(
                text="This agreement shall be governed by and construed in accordance with the laws of [jurisdiction].",
                context="Specifying governing law",
                register="formal",
            ),
            PhrasebookEntry(
                text="Any dispute arising out of or in connection with this contract shall be referred to arbitration.",
                context="Dispute resolution clause",
                register="formal",
            ),
            PhrasebookEntry(
                text="Time is of the essence with respect to delivery.",
                context="Stressing deadline importance",
                register="formal",
            ),
            PhrasebookEntry(
                text="The licensor grants a non-exclusive, non-transferable licence to use...",
                context="Licensing language",
                register="formal",
            ),
            PhrasebookEntry(
                text="Either party may terminate this agreement upon [n] days' written notice.",
                context="Termination clause",
                register="formal",
            ),
            PhrasebookEntry(
                text="This clause shall survive the termination of the agreement.",
                context="Survival clause",
                register="formal",
            ),
            PhrasebookEntry(
                text="Without prejudice to any other rights or remedies available, ...",
                context="Reserving additional rights",
                register="formal",
            ),
            PhrasebookEntry(
                text="Force majeure events shall excuse performance obligations.",
                context="Addressing unforeseeable circumstances",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="social_commentary_c2",
        level="C2",
        situation="Social Commentary & Debate",
        icon="\U0001f5de\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="The systemic nature of this problem demands a structural response, not a piecemeal one.",
                context="Arguing for root-cause solutions",
                register="formal",
            ),
            PhrasebookEntry(
                text="We risk conflating two very different phenomena if we treat them as equivalent.",
                context="Warning against false equivalence",
                register="formal",
            ),
            PhrasebookEntry(
                text="The dominant narrative obscures more than it reveals.",
                context="Challenging mainstream framing",
                register="formal",
            ),
            PhrasebookEntry(
                text="There is a troubling tendency to mistake complexity for ambiguity.",
                context="Distinguishing nuance from vagueness",
                register="formal",
            ),
            PhrasebookEntry(
                text="The discourse around this issue has been, at best, superficial.",
                context="Critiquing the quality of public debate",
                register="formal",
            ),
            PhrasebookEntry(
                text="What we are witnessing is the logical consequence of decades of policy neglect.",
                context="Tracing cause and effect",
                register="formal",
            ),
            PhrasebookEntry(
                text="Moral outrage, however justified, is not a substitute for analysis.",
                context="Calling for reason over emotion",
                register="formal",
            ),
            PhrasebookEntry(
                text="The question is not whether change is needed, but who bears the cost of that change.",
                context="Reframing a debate around equity",
                register="formal",
            ),
            PhrasebookEntry(
                text="History offers no shortage of cautionary tales on this front.",
                context="Invoking historical precedent",
                register="formal",
            ),
            PhrasebookEntry(
                text="We should resist the temptation to reduce a multifaceted issue to a single cause.",
                context="Opposing oversimplification",
                register="formal",
            ),
            PhrasebookEntry(
                text="The stakes could hardly be higher.",
                context="Emphasising urgency",
                register="formal",
            ),
        ],
    ),
]
