"""British English phrasebook — B2 categories."""

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
                text="Please note that...",
                context="Drawing attention to important information in a formal email — common in British business correspondence",
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
                text="Yours faithfully,",
                context="Formal sign-off when the salutation is 'Dear Sir/Madam' (recipient unknown)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Yours sincerely,",
                context="Formal sign-off when the salutation names the recipient (e.g. 'Dear Mr Smith')",
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
    PhrasebookCategory(
        id="customer_complaints_b2",
        level="B2",
        situation="Customer Service & Complaints",
        icon="\U0001f4e9",
        phrases=[
            PhrasebookEntry(
                text="I'm afraid there seems to be a problem with my order.",
                context="Opening a complaint politely",
                register="neutral",
            ),
            PhrasebookEntry(
                text="This isn't quite what I ordered.",
                context="Politely pointing out an error",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd like to return this item, please.",
                context="Requesting a return",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I think I've been overcharged.",
                context="Disputing a charge politely",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Could I speak to the manager, please?",
                context="Escalating a complaint",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd like a full refund, please.",
                context="Requesting a refund",
                register="neutral",
            ),
            PhrasebookEntry(
                text="This isn't up to the standard I'd expect.",
                context="Expressing dissatisfaction with quality",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Could I have a replacement instead?",
                context="Asking for a replacement item",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd like to make a formal complaint.",
                context="Initiating a written or official complaint",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'm sure we can sort this out.",
                context="Collaborative, solution-focused tone",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="social_informal_b2",
        level="B2",
        situation="Informal Social English",
        icon="\U0001f37b",
        phrases=[
            PhrasebookEntry(
                text="It's good to catch up!",
                context="Seeing someone you haven't seen for a while",
                register="informal",
            ),
            PhrasebookEntry(
                text="What have you been up to lately?",
                context="Casual catching-up question",
                register="informal",
            ),
            PhrasebookEntry(
                text="I've been meaning to give you a ring.",
                context="'Give someone a ring' = call them — common British expression",
                register="informal",
            ),
            PhrasebookEntry(
                text="I know exactly what you mean.",
                context="Showing agreement and empathy",
                register="informal",
            ),
            PhrasebookEntry(
                text="That's easier said than done.",
                context="Pointing out that something is more difficult than it sounds",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd rather not, if you don't mind.",
                context="Polite refusal — very British in its indirectness",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's a bit hit and miss, to be honest.",
                context="'Hit and miss' = inconsistent in quality — common British idiom",
                register="informal",
            ),
            PhrasebookEntry(
                text="It could have been worse!",
                context="British understatement when things went badly but not catastrophically",
                register="informal",
            ),
            PhrasebookEntry(
                text="It's nothing to write home about.",
                context="British expression meaning something is unremarkable or average",
                register="informal",
            ),
            PhrasebookEntry(
                text="Same again?",
                context="Offering to buy another round of drinks — essential in British pub culture",
                register="informal",
            ),
        ],
    ),
]
