"""English phrasebook — B2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="formal_emails_b2",
        level="B2",
        situation="Formal Emails & Letters",
        icon="\U0001f4e7",
        phrases=[
            PhrasebookEntry(
                text="I am writing to enquire about...",
                context="Opening \u2014 asking for information",
                register="formal",
            ),
            PhrasebookEntry(
                text="I am writing with reference to...",
                context="Opening \u2014 referencing something",
                register="formal",
            ),
            PhrasebookEntry(
                text="Thank you for your email of [date].",
                context="Acknowledging a received email",
                register="formal",
            ),
            PhrasebookEntry(
                text="Further to our conversation, ...",
                context="Following up after a meeting/call",
                register="formal",
            ),
            PhrasebookEntry(
                text="I would like to draw your attention to...",
                context="Highlighting important information",
                register="formal",
            ),
            PhrasebookEntry(
                text="Please find attached [document].",
                context="Mentioning an attachment",
                register="formal",
            ),
            PhrasebookEntry(
                text="I would appreciate it if you could...",
                context="Making a formal request",
                register="formal",
            ),
            PhrasebookEntry(
                text="Should you require any further information, please do not hesitate to contact me.",
                context="Offering further help",
                register="formal",
            ),
            PhrasebookEntry(
                text="I look forward to your reply.",
                context="Closing \u2014 awaiting response",
                register="formal",
            ),
            PhrasebookEntry(
                text="Yours faithfully, / Yours sincerely,",
                context="Formal sign-off",
                register="formal",
            ),
            PhrasebookEntry(
                text="Kind regards, / Best regards,",
                context="Semi-formal sign-off",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="negotiations_b2",
        level="B2",
        situation="Discussions & Negotiations",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Could we come to a compromise?",
                context="Proposing a middle ground",
                register="formal",
            ),
            PhrasebookEntry(
                text="I see your point, but from our perspective...",
                context="Presenting your side",
                register="neutral",
            ),
            PhrasebookEntry(
                text="We'd be willing to [offer], provided that...",
                context="Making a conditional offer",
                register="formal",
            ),
            PhrasebookEntry(
                text="That doesn't quite work for us because...",
                context="Politely rejecting a proposal",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What if we were to [suggest alternative]?",
                context="Proposing an alternative",
                register="neutral",
            ),
            PhrasebookEntry(
                text="We need to consider all the options.",
                context="Stalling for time",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'll need to discuss this with my team.",
                context="Deferring a decision",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Can we revisit this point later?",
                context="Postponing a topic",
                register="neutral",
            ),
            PhrasebookEntry(
                text="That seems fair.", context="Agreeing to a proposal", register="neutral"
            ),
            PhrasebookEntry(
                text="We have a deal.", context="Finalising an agreement", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="academic_discussion_b2",
        level="B2",
        situation="Academic & Formal Discussions",
        icon="\U0001f393",
        phrases=[
            PhrasebookEntry(
                text="Evidence suggests that...", context="Presenting evidence", register="formal"
            ),
            PhrasebookEntry(
                text="According to [source], ...", context="Citing a source", register="formal"
            ),
            PhrasebookEntry(
                text="It could be argued that...",
                context="Presenting an argument objectively",
                register="formal",
            ),
            PhrasebookEntry(
                text="On the other hand, ...",
                context="Presenting a contrasting view",
                register="formal",
            ),
            PhrasebookEntry(
                text="To a certain extent, ...", context="Qualified agreement", register="formal"
            ),
            PhrasebookEntry(
                text="This raises the question of...",
                context="Introducing a question",
                register="formal",
            ),
            PhrasebookEntry(
                text="There is no denying that...",
                context="Stating an undeniable fact",
                register="formal",
            ),
            PhrasebookEntry(
                text="The implications of this are significant.",
                context="Highlighting consequences",
                register="formal",
            ),
            PhrasebookEntry(
                text="In summary, ...", context="Summarising a point", register="formal"
            ),
            PhrasebookEntry(
                text="This leads me to conclude that...",
                context="Drawing a conclusion",
                register="formal",
            ),
        ],
    ),
]
