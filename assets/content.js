// All site content lives here. Edit this file; the page renders from it.
// Email is stored split so naive scrapers don't pick it up from the source.
// Content follows the final Privacy Engineer 2-page resume (Nov 2026).

window.SITE = {
  name: "Mingchen Li",
  handle: "~/mingchen",
  role: "Privacy engineer",
  tagline: "I build machine learning systems that keep sensitive data where it belongs.",
  focus: ["privacy-preserving ML", "trustworthy AI", "secure systems"],
  fingerprint: "",                                 // optional, e.g. "PGP 9F2C 41B7 E0A3 ..."
  location: "",                                    // optional, e.g. "San Francisco, CA"
  status: "Open to privacy engineer, applied scientist, machine learning engineer, and software development engineer roles",

  about: [
    "Privacy engineer with over 8 years of experience designing systems that protect personal data, identifying privacy and security risks, and applying Privacy by Design from data collection to deployment.",
    "I work where privacy meets machine learning. My recent work keeps raw personal data on the user's device before any cloud processing and maps how compressing LLMs for edge devices opens new attack surfaces. Earlier, I built privacy-enhancing technologies that let organizations share and learn from data without exposing individual records.",
    "I am completing a Ph.D. in Electrical Engineering at the University of South Florida (December 2026) and have hands-on experience with GDPR and CCPA privacy reviews, data governance, and data retention and deletion."
  ],

  focus_areas: [
    { title: "Privacy by Design and reviews", text: "Privacy risk assessment, data minimization, and GDPR and CCPA privacy reviews, applied from data collection to deployment.", cases: ["CASE-008", "CASE-007"] },
    { title: "Privacy-enhancing technologies", text: "Differential privacy, local differential privacy, and private synthetic data that keep data useful for machine learning.", cases: ["CASE-003", "CASE-002", "CASE-001"] },
    { title: "AI and LLM security", text: "Threat modeling for ML systems, adversarial machine learning, data poisoning, and LLM security on edge devices.", cases: ["CASE-007", "CASE-005"] },
    { title: "Data protection engineering", text: "On-device PII detection and redaction, de-identification, access control, and data retention built into real pipelines.", cases: ["CASE-008", "CASE-006"] }
  ],

  // status: ACTIVE | PUBLISHED | PREPRINT | SHIPPED | ARCHIVED
  cases: [
    {
      id: "CASE-008",
      status: "ACTIVE",
      title: "Privacy-aware multimodal document intelligence",
      period: "Mar 2026 – present",
      threat: "sensitive fields leaving the device",
      result: "raw personal data stays on device · +12% extraction accuracy",
      tags: ["PII detection and redaction", "data minimization", "VLMs", "OCR", "AI agents"],
      context: "Engineering documents mix text, tables, CAD drawings, and images, and they often carry names, signatures, and other personal data. Cloud models read them well, but sending a raw page to a server moves that data off the device. This project keeps the privacy boundary on the device while still getting the accuracy of the best engine for each part of the page.",
      metrics: [
        { v: "12%", l: "higher field-level accuracy than any single engine" },
        { v: "7", l: "VLM and OCR engines benchmarked" },
        { v: "4", l: "content types: text, tables, CAD, images" }
      ],
      deep: [],
      details: [
        "Designed an on-device PII detection and redaction layer that applies Privacy by Design and data minimization, removing sensitive fields before server-side processing and keeping raw personal data on the device.",
        "Built the end-to-end pipeline that extracts text, tables, CAD drawings, and images, cross-checks results across engines, and flags low-confidence fields for human review instead of passing errors downstream.",
        "Benchmarked 7 VLM and OCR engines on accuracy, speed, and memory, and built an LLM-based agentic orchestrator that routes each region to the best engine, raising field-level accuracy by 12% over any single engine."
      ],
      links: []
    },
    {
      id: "CASE-007",
      status: "PREPRINT",
      title: "Edge LLM privacy and security",
      period: "Feb 2026 – Jun 2026",
      threat: "jailbreak, data reconstruction, membership inference",
      result: "a defense for each optimization · INT4 cuts GPU memory up to 70%",
      tags: ["LLM security", "threat modeling", "privacy risk assessment", "quantization"],
      context: "Running an LLM on the user's own device keeps prompts and data out of the cloud. The optimizations that make a model fit on that device, such as quantization, pruning, split inference, and LoRA fine-tuning, also change what an attacker can see and do. This work maps each optimization to the attacks it opens and the defense that closes them.",
      metrics: [
        { v: "70%", l: "less GPU memory with INT4, at best" },
        { v: "\u22644.1", l: "MMLU points lost after INT4" },
        { v: "6", l: "edge LLMs, 1.5B to 3.8B parameters" }
      ],
      deep: [
        "Tested 6 open models from 1.5B to 3.8B parameters, including Phi-3.5-mini, Qwen2.5-1.5B, Llama-3.2, Gemma-2-2B, and Granite, on a single NVIDIA T4 GPU.",
        "INT4 cut GPU memory by 34 to 70% on the models it applied to, with at most 4.1 MMLU points lost, but some models got slower, up to about 2.2x for Qwen.",
        "Accuracy alone picked the wrong model. Phi-3.5-mini scored highest on MMLU (68.9%) yet refused only 2 to 3 of 10 harmful prompts, while Qwen2.5-1.5B refused all 10 and ranked first on the Secure Operational Efficiency Score.",
        "Measured context leakage with a canary test that plants 30 secret strings in the model's context, and proposed a Three-Wall feasibility model for memory, attention, and compute limits."
      ],
      details: [
        "Analyzed how quantization, pruning, split inference, and parameter-efficient fine-tuning expose on-device LLMs to jailbreak, data reconstruction, and membership inference attacks, and defined a defense for each, giving teams a checklist to compress models for edge devices without opening new privacy gaps.",
        "Designed a framework that checks models against device memory, attention, and compute limits, and a Secure Operational Efficiency Score that rates accuracy, privacy, and security to pick the right model for each device.",
        "Benchmarked 6 edge LLMs at full precision and INT4 on GPU memory, energy, latency, and safety, and turned the results into deployment guidance, showing INT4 cuts GPU memory by up to 70% at some cost in latency."
      ],
      links: [{ label: "preprint", url: "https://arxiv.org/abs/2607.13088" }]
    },
    {
      id: "CASE-006",
      status: "SHIPPED",
      title: "Customer support RAG system",
      period: "Sep 2024 – Dec 2024",
      threat: "answers drawn from the wrong or outdated source",
      result: "precision@5 from 74% to 88%",
      tags: ["RAG", "prompt engineering", "FastAPI", "Docker", "vector databases"],
      context: "A customer-support team needed answers grounded in a knowledge base that changed every week. Wrong or stale answers cost trust, so the work focused on retrieving the right source document and keeping the index current without manual effort.",
      metrics: [
        { v: "88%", l: "precision@5, up from 74%" },
        { v: "+14", l: "percentage points of retrieval precision" },
        { v: "0", l: "manual re-indexing steps after launch" }
      ],
      deep: [],
      details: [
        "Built the retrieval, indexing, and embedding pipeline for a containerized customer-support RAG service with an API that answers questions over a frequently changing knowledge base.",
        "Improved precision@5 from 74% to 88% through hierarchical chunking, hybrid keyword-semantic search, and vector indexing, raising the share of answers drawn from the right source documents.",
        "Automated index updates from source content, keeping search results current without manual re-indexing."
      ],
      links: []
    },
    {
      id: "CASE-005",
      status: "PUBLISHED",
      title: "Adversarial graph learning for link prediction",
      period: "Oct 2022 – Jul 2025",
      threat: "poisoned graph edges",
      result: "20 to 60% more effective at a 5% edge budget",
      tags: ["data poisoning", "adversarial ML", "graph neural networks", "PyTorch"],
      context: "Link prediction drives friend suggestions, citations, and product recommendations. If an attacker can quietly change a few edges in the training graph, the model learns the wrong links. This framework measures that risk before deployment and shows which defenses actually help.",
      metrics: [
        { v: "20\u201360%", l: "relatively more effective than uniform weighting" },
        { v: "5%", l: "of graph edges changed" },
        { v: "10%", l: "more relative degradation than the average of 5 attacks" }
      ],
      deep: [
        "Covered 3 graph domains, citation (Cora), social (Twitch), and recommendation (MovieLens), against 3 model types (VGAE, GAT, LightGCN).",
        "Compared against 5 existing attacks, including PGD, DICE, IGA, CLGA, and MetaBase.",
        "Adversarial training and DropEdge recovered only 25 to 48% of the lost performance, showing that common defenses leave graph pipelines exposed."
      ],
      details: [
        "Built a model-agnostic graph poisoning framework that measures how much link prediction and recommendation models degrade when an attacker alters a small, controlled share of graph edges, enabling teams to assess risk before deployment.",
        "Developed 3 attack weighting strategies (magnitude, performance, and linear) that made the attack 20 to 60% more effective than uniform weighting when only 5% of graph edges are changed, while keeping key graph statistics nearly unchanged and the attack hard to detect.",
        "Produced 10% more relative performance degradation than the average of 5 existing attacks across 3 graph domains and 3 model types (VGAE, GAT, LightGCN), setting a stronger benchmark for evaluating the robustness of graph neural networks.",
        "Measured how detectable the attack is with standard graph statistics, and tested adversarial training and DropEdge as defenses to show where graph pipelines need extra protection."
      ],
      links: [
        { label: "IEEE BigData 2025", url: "https://ieeexplore.ieee.org/abstract/document/11402598" },
        { label: "code", url: "https://github.com/mingchenli/VGAE_Attack_Meta" }
      ]
    },
    {
      id: "CASE-004",
      status: "ARCHIVED",
      title: "Roadway safety analytics platform",
      period: "Aug 2019 – Aug 2022",
      threat: "poorly lit roads raising nighttime crash risk",
      result: "clustering runtime from 504 to 53 seconds",
      tags: ["Python", "REST APIs", "SQLite", "ArcGIS", "hierarchical clustering"],
      context: "Florida DOT needed to know which roads were poorly lit from a driver's view and where lighting upgrades would prevent the most nighttime crashes. The platform turned field lighting measurements and crash records into ranked, mappable recommendations.",
      metrics: [
        { v: "90%", l: "faster clustering, 504 s to 53 s" },
        { v: "1,926", l: "lane miles analyzed" },
        { v: "17%", l: "fewer nighttime crashes estimated for LED upgrades" }
      ],
      deep: [
        "Covered 171 road segments and 412 centerline miles in FDOT District 7.",
        "The project's Phase II safety analysis found that upgrading high-pressure sodium lights to LED tends to cut nighttime crash frequency by 17% in Florida."
      ],
      details: [
        "Developed a roadway lighting analytics engine as a reusable Python package with REST API, SQLite, flat-file, and ArcGIS connectors, running standalone or as a mapping tool for Florida DOT decision support.",
        "Implemented a sliding-window lighting diagnosis from the driver's view and hierarchical clustering that groups roads by lighting pattern across 171 road segments, 412 centerline miles, and 1,926 lane miles.",
        "Cut hierarchical clustering runtime from 504 to 53 seconds (about 90%) and packaged the analysis to support district-wide lighting upgrade decisions at FDOT District 7."
      ],
      links: [
        { label: "FDOT report, Phase I", url: "https://rosap.ntl.bts.gov/view/dot/55963" },
        { label: "FDOT report, Phase II", url: "https://rosap.ntl.bts.gov/view/dot/74122" }
      ]
    },
    {
      id: "CASE-003",
      status: "PREPRINT",
      title: "LDP-DL: privacy-preserving distributed learning",
      period: "Aug 2019 – May 2021",
      threat: "pooled raw records and a trusted server",
      result: "25 to 50% smaller privacy budget",
      tags: ["local differential privacy", "knowledge distillation", "active learning", "PyTorch"],
      context: "Hospitals and other organizations each hold too little data to train a strong model, but pooling raw records raises serious privacy concerns. LDP-DL lets each data owner train a local teacher model and share only privatized outputs, and the data user trains a student model from them.",
      metrics: [
        { v: "25\u201350%", l: "smaller privacy budget" },
        { v: "\u226580%", l: "model utility kept" },
        { v: "98.8%", l: "MNIST accuracy at \u03b5 = 8" }
      ],
      deep: [
        "Compared with DP-SGD, PATE, and DP federated learning on MNIST, Fashion-MNIST, and CIFAR-10.",
        "At privacy budget \u03b5 = 8, reached 98.8% accuracy on MNIST, 85.7% on Fashion-MNIST, and 79.7% on CIFAR-10, the highest of the four methods."
      ],
      details: [
        "Designed a teacher-student training architecture that applies local differential privacy to each data owner's outputs, allowing organizations to train a shared model without pooling raw records or relying on a trusted server.",
        "Implemented active query sampling to limit total privacy cost while keeping at least 80% model utility across 3 benchmark datasets.",
        "Outperformed 3 privacy-preserving training methods (DP-SGD, PATE, and DP federated learning) and cut the required privacy budget by 25 to 50%, giving stronger privacy at comparable accuracy."
      ],
      links: [{ label: "preprint", url: "https://arxiv.org/abs/2202.02971" }]
    },
    {
      id: "CASE-002",
      status: "PUBLISHED",
      title: "MC-GEN: private synthetic data generation",
      period: "Aug 2018 – Dec 2020",
      threat: "re-identification in shared datasets",
      result: "at least 85% of real-data accuracy",
      tags: ["differential privacy", "private synthetic data", "clustering", "Java", "Python"],
      context: "Teams often need realistic data to build and test models, but sharing real records risks re-identification. MC-GEN releases synthetic data under differential privacy that stays useful for machine learning.",
      metrics: [
        { v: "\u226585%", l: "of real-data model accuracy kept" },
        { v: "3", l: "datasets: Diabetes, Adult, Phishing" },
        { v: "3", l: "classifiers: SVM, LR, gradient boosting" }
      ],
      deep: [
        "Outperformed 3 existing private synthetic data methods in most of the tested settings."
      ],
      details: [
        "Developed MC-GEN, an end-to-end differentially private synthetic data pipeline that combines multi-level clustering, automated privacy protection, and data generation for safe data sharing.",
        "Showed that multi-level clustering uses less privacy budget than sample-only clustering at the same privacy level, validating the privacy-utility tradeoff on 3 datasets with multiple classifiers.",
        "Generated synthetic data that retained at least 85% of the accuracy of models trained on real data, allowing data users to train and test on synthetic data without exposing individual records."
      ],
      links: [
        { label: "Knowledge-Based Systems 2023", url: "https://www.sciencedirect.com/science/article/abs/pii/S0950705122013351" },
        { label: "code", url: "https://github.com/mingchenli/MCGEN-Private-Synthetic-Data-Generator" }
      ]
    },
    {
      id: "CASE-001",
      status: "ARCHIVED",
      title: "Privacy-preserving ML under DARPA Brandeis",
      period: "Jan 2017 – Dec 2018",
      threat: "raw images exposed to the server",
      result: "recognition runs on protected data",
      tags: ["differential privacy", "encryption", "Java", "Docker", "MySQL"],
      context: "Under the DARPA Brandeis program, the goal was to run useful machine learning, such as face recognition and fall detection, without the server ever seeing raw images of people.",
      metrics: [
        { v: "2", l: "private ML workloads: face recognition, fall detection" },
        { v: "3", l: "protections combined: dimensionality reduction, DP, encryption" }
      ],
      deep: [],
      details: [
        "Integrated server-side components for privacy-preserving face recognition and fall detection into a modular ML backend, combining dimensionality reduction, differential privacy, and encryption to run recognition on protected data without exposing raw images to the server.",
        "Containerized the Java services with Docker and connected them through MySQL and Protocol Buffers, allowing partner teams to deploy the backend on their own servers without manual configuration."
      ],
      links: []
    }
  ],

  // First-author papers first, newest first; then the others, newest first.
  log: [
    { date: "2026", type: "under review", title: "Compression for Speed, Exposure for Free: The Unforeseen Privacy and Security Risks of Edge LLM Optimization", venue: "IEEE Security & Privacy", url: "" },
    { date: "2026", type: "under review", title: "Weighted Meta-Learning for Stealthy Poisoning Attacks on Graph Link Prediction", venue: "Neurocomputing", url: "" },
    { date: "2025", type: "paper", title: "Exploiting Meta-Learning-based Poisoning Attacks for Graph Link Prediction", venue: "IEEE BigData", url: "https://ieeexplore.ieee.org/abstract/document/11402598" },
    { date: "2023", type: "journal", title: "MC-GEN: Multi-level Clustering for Private Synthetic Data Generation", venue: "Knowledge-Based Systems", url: "https://www.sciencedirect.com/science/article/abs/pii/S0950705122013351" },
    { date: "2026", type: "preprint", title: "Securing LLMs in the Wild: Privacy and Security Challenges at the Edge", venue: "arXiv:2607.13088", url: "https://arxiv.org/abs/2607.13088" },
    { date: "2024", type: "journal", title: "Epi-Curriculum: Episodic Curriculum Learning for Low-Resource Domain Adaptation in Neural Machine Translation", venue: "IEEE Transactions on Artificial Intelligence", url: "" },
    { date: "2023", type: "journal", title: "Modeling Effects of Roadway Lighting on Nighttime Pedestrian Crashes", venue: "Journal of Safety Research", url: "" },
    { date: "2022", type: "preprint", title: "Locally Differentially Private Distributed Deep Learning via Knowledge Distillation", venue: "arXiv:2202.02971", url: "https://arxiv.org/abs/2202.02971" },
    { date: "2022", type: "report", title: "Development of Automated Roadway Lighting Diagnosis Tools for Nighttime Traffic Safety Improvement, Phase II", venue: "Florida Department of Transportation", url: "https://rosap.ntl.bts.gov/view/dot/74122" },
    { date: "2021", type: "journal", title: "Development of Crash Modification Factors for Roadway Illuminance: A Matched Case-Control Study", venue: "Accident Analysis and Prevention", url: "https://doi.org/10.1016/j.aap.2021.106279" },
    { date: "2021", type: "report", title: "Demand-Side Management of Auto Traffic for Urban Parcel Delivery", venue: "National Institute for Congestion Reduction", url: "https://rosap.ntl.bts.gov/view/dot/61863" },
    { date: "2020", type: "report", title: "Development of Automated Roadway Lighting Diagnosis Tools for Nighttime Traffic Safety Improvement", venue: "Florida Department of Transportation", url: "https://rosap.ntl.bts.gov/view/dot/55963" },
    { date: "2019", type: "preprint", title: "DynaMo: Dynamic Community Detection by Incrementally Maximizing Modularity", venue: "arXiv:1709.08350", url: "https://arxiv.org/abs/1709.08350" }
  ],

  stack: {
    privacy: ["Privacy by Design", "privacy risk assessment", "data minimization", "access control", "PII detection and redaction", "de-identification", "privacy-preserving machine learning", "differential privacy", "private synthetic data"],
    ml: ["deep learning", "model training and evaluation", "knowledge distillation", "active learning", "model compression", "clustering", "statistical modeling"],
    ai_security: ["threat modeling", "adversarial machine learning", "data poisoning", "LLM security", "LLM watermarking"],
    compliance: ["GDPR", "CCPA", "data governance", "privacy reviews", "data retention and deletion"],
    programming: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "SQL", "Java", "FastAPI", "Docker", "Git"]
  },

  education: [
    { degree: "Ph.D., Electrical Engineering", school: "University of South Florida", year: "exp. Dec 2026" },
    { degree: "M.S., Electrical Engineering", school: "Illinois Institute of Technology", year: "2016" },
    { degree: "B.Eng., Measuring and Control Technology and Instruments", school: "Tianjin University", year: "2014" }
  ],

  contact: {
    emailUser: "mingchenli0406",
    emailDomain: "gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mingchen-li-2b8513175" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=9at2iscAAAAJ&hl=en" },
      { label: "GitHub", url: "https://github.com/mingchenli" }
    ]
  }
};
