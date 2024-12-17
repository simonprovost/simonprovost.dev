const researchConfig = {
    showTitle: "Research",
    posts: [
        {
            titles: ["Auto-Sklong:", "A New AutoML System", "for Longitudinal Classification"],
            authors: "Simon Provost, Prof. Alex Freitas",
            details: ["2024 · Main Author", "IEEE Bioinformatics and Biomedicine (BIBM)"],
            abstract: "Automated Machine Learning (AutoML) addresses the challenge of selecting the best machine learning algorithm and its hyperparameter settings for a given dataset. However, existing AutoML systems typically focus on standard classification tasks and cannot directly exploit temporal information e.g. in longitudinal datasets, which contain multiple measurements of the same features over time — a common scenario in biomedical applications. We introduce Auto-Sklong, the first AutoML system that includes longitudinal classification algorithms in its search space. Experiments with 20 age-related disease datasets from the English Longitudinal Study of Ageing demonstrate that Auto-Sklong significantly outperforms a state-of-the-art AutoML system (Auto-Sklearn) and two baseline random forest methods in terms of predictive accuracy.",
            url: "https://ieeebibm.org/BIBM2024/documents/IEEE%20BIBM%202024PublicationPaperList.pdf#page=1.00&gsr=0",
        },
        {
            titles: ["Risk Adjustment for Auditing Free Flap Outcomes", "in Head and Neck Surgery"],
            authors: "David Tighe, Michael Ho, Fabian Puglia, Panayiotis Kyzas, Simon Provost, Jeremy Mcmahon",
            details: ["2023 · Co-Author", "British Journal of Oral & Maxillofacial Surgery (BOMS)"],
            abstract: "Materials and Methods The risk adjusted algorithm is applied to the current dataset of surgical care episodes of head and neck immediate free flap reconstructions (n= 400) compiled from 11 NHS hospitals engaged in the QOMS process. The risk adjustment algorithm uses preoperative patient demographic data, operation data, functional status data and free flap choice data to produce a probability of free flap failure for each patient.",
            url: "https://doi.org/10.1016/j.bjoms.2023.08.014",
        },
        {
            titles: ["Technical Appendix:", "Validating Risk-Adjustment Models in QOMS"],
            authors: "Tighe DF, Sassoon I, Provost S, Puglia FA, and Ho MWS",
            details: ["2023 · Co-Author", "Quality & Outcomes in Oral & Maxillofacial Surgery"],
            abstract: "The Quality and Outcomes in Oral and Maxillofacial Surgery (QOMS) project is the quality improvement and clinical effectiveness programme for Oral and Maxillofacial Surgery (OMFS), initiated by the British Association of Oral and Maxillofacial Surgeons (BAOMS) in 2018. QOMS operates a series of audits across several OMFS subspecialties to assess the quality of care provided to patients in OMFS units in the UK. The QOMS Oncology & Reconstruction and Non-Melanoma Skin Cancer (NMSC) audits are set apart from the other QOMS registries for having published risk-adjustment models built in in their online interface and thus providing users with patient-level risk-adjustment as and when data are entered.",
            url: "https://www.researchgate.net/profile/Provost-Simon/publication/376398495_Technical_appendix-Validating_risk-adjustment_models_used_in_QOMS/links/6576f6e8fc4b416622b7d35f/Technical-appendix-Validating-risk-adjustment-models-used-in-QOMS.pdf",
        },
        {
            titles: ["Machine Learning for Predicting Surgical Margins", "in Skin Cancer"],
            authors: "David Tighe,  Kemal Tekeli,  Tara Gouk,  Jennifer Smith,  Michael Ho,  Andrew Moody,  Stephen Walsh,  Simon Provost,  Alex Freitas",
            details: ["2023 · Co-Author", "British Journal of Oral & Maxillofacial Surgery (BOMS)"],
            abstract: "We aimed to build a model to predict positive margin status after curative excision of facial non-melanoma skin cancer based on known risk factors that contribute to the complexity of the case mix. A pathology output of consecutive histology reports was requested from three oral and maxillofacial units in the south east of England. The dependent variable was a deep margin with peripheral margin clearance at a 0.5 mm threshold. A total of 3354 cases were analysed. Positivity of either the peripheral or deep margin for both squamous cell carcinoma (SCC) and basal cell carcinoma (BCC) was 15.4% at Unit 1, 21.1% at Unit 2, and 15.4% at Unit 3. Predictive models accounting for patient and tumour factors were developed using automated machine learning methods. The champion models demonstrated good discrimination for predicting margin status after excision of BCCs (AUROC = 0.67) and SCCs (AUROC = 0.71). We demonstrate that rates of positive excision margins of facial non-melanoma skin cancer (fNMSC), when adjusted by the risk prediction model, can be used to compare unit performance fairly once variations in tumour factors and patient factors are accounted for.",
            url: "https://www.sciencedirect.com/science/article/abs/pii/S026643562200585X",
        },
        {
            titles: ["Risk-Adjusted Cumulative Sum", "for Monitoring Free Flap Failures"],
            authors: "David Tighe, Jeremy McMahon, Clare Schilling, Michael Ho, Simon Provost, Alex Freitas",
            details: ["2022 · Co-Author", "British Journal of Oral & Maxillofacial Surgery (BOMS)"],
            abstract: "We describe a risk adjustment algorithm to benchmark and report free flap failure rates after immediate reconstruction of head and neck defects. A dataset of surgical care episodes for curative surgery for head and neck cancer and immediate reconstruction (n = 1593) was compiled from multiple NHS hospitals (n = 8). The outcome variable was complete flap failure. Classification models using preoperative patient demographic data, operation data, functional status data and tumour stage data, were built. Machine learning processes are described to model free flap failure. Overall complete flap failure was uncommon (4.7%) with a non-statistical difference seen between hospitals. The champion predictive model had acceptable discrimination (AUROC 0.66). This model was used to risk-adjust cumulative sum (CuSUM) charts. The use of CuSUM charts is a viable way to monitor in a ‘Live Dashboard’ this quality metric as part of the quality outcomes in oral and maxillofacial surgery audit. ",
            url: "https://doi.org/10.1016/j.bjoms.2022.09.007",
        },
    ],
};

export default researchConfig;
