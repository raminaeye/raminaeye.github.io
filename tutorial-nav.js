/* tutorial-nav.js: Previous and Next tutorial links on the crumb line.
   Plan: new-asks-2026-11-04/prev-next/PLAN.md (rev 5), sections 1.2 and 2.2.
   The ORDER and TITLES blocks are written by gen_tutorial_order.py from the
   catalog order of tutorial.html. Do not edit them by hand. One writer: the
   prev-next lane, branch prev-next. No CSS here; the PREV-NEXT block in
   PREREQ-ROW.md is inline on every page. Without JS the crumb stays. */
(function () {
  'use strict';
  var ENABLED = true;

  /* ORDER-BEGIN */
  var ORDER = [
    ["linear-algebra.html", "Vectors and Matrices", "Vectors and Matrices", "Math Foundations"],
    ["probability.html", "Probability", "Probability and Bayes Rule", "Math Foundations"],
    ["distributions.html", "Bernoulli Uniform", "Bernoulli, Categorical and Uniform Distributions", "Math Foundations"],
    ["gaussian.html", "Gaussian", "The Gaussian Distribution", "Math Foundations"],
    ["eigen-svd.html", "Eigenvectors", "Eigenvalues and Eigenvectors", "Math Foundations"],
    ["svd.html", "SVD", "Singular Value Decomposition (SVD)", "Math Foundations"],
    ["regression.html", "Regression", "Linear Regression", "Classical Machine Learning"],
    ["logistic.html", "Logistic Regression", "Logistic Regression", "Classical Machine Learning"],
    ["mlp.html", "MLPs", "Multilayer Perceptrons (MLP)", "Classical Machine Learning"],
    ["trees.html", "Decision Trees", "Decision Trees", "Classical Machine Learning"],
    ["random-forests.html", "Random Forests", "Random Forests", "Classical Machine Learning"],
    ["gradient-boosting.html", "Gradient Boosting", "Gradient Boosting", "Classical Machine Learning"],
    ["xgboost.html", "XGBoost and LightGBM", "XGBoost and LightGBM", "Classical Machine Learning"],
    ["svm.html", "SVMs", "Support Vector Machines (SVM)", "Classical Machine Learning"],
    ["knn.html", "k-NN", "k-Nearest Neighbors (k-NN)", "Classical Machine Learning"],
    ["naive-bayes.html", "Naive Bayes", "Naive Bayes", "Classical Machine Learning"],
    ["kmeans.html", "k-Means", "k-Means Clustering", "Classical Machine Learning"],
    ["likelihood-em.html", "Likelihood and EM", "Maximum Likelihood and EM", "Classical Machine Learning"],
    ["gmm.html", "GMMs", "Gaussian Mixture Models (GMM)", "Classical Machine Learning"],
    ["hmm.html", "HMMs", "Hidden Markov Models (HMM)", "Classical Machine Learning"],
    ["pca.html", "PCA", "Principal Component Analysis (PCA)", "Classical Machine Learning"],
    ["ica.html", "ICA", "Independent Component Analysis (ICA)", "Classical Machine Learning"],
    ["nmf.html", "NMF", "Non-negative Matrix Factorization (NMF)", "Classical Machine Learning"],
    ["tsne.html", "t-SNE", "t-SNE", "Classical Machine Learning"],
    ["reco.html", "Recommender Systems", "Recommender Systems", "Classical Machine Learning"],
    ["cnn.html", "CNN Basics", "CNN Basics: Convolution, Stride and Pooling", "Deep Learning Fundamentals"],
    ["cnn-receptive-fields.html", "Receptive Fields", "Receptive Fields, Dilation and Causal Convolutions", "Deep Learning Fundamentals"],
    ["cnn-architectures.html", "CNN Architectures Overview", "Classic CNN Architectures: Overview", "Deep Learning Fundamentals"],
    ["alexnet.html", "AlexNet", "AlexNet", "Deep Learning Fundamentals"],
    ["vgg.html", "VGG", "VGG: Deep Stacks of 3\u00d73 Convolutions", "Deep Learning Fundamentals"],
    ["inception.html", "Inception", "Inception (GoogLeNet) and 1\u00d71 Convolutions", "Deep Learning Fundamentals"],
    ["resnet.html", "ResNet", "ResNet and Residual Connections", "Deep Learning Fundamentals"],
    ["efficient-cnns.html", "Efficient CNNs", "Efficient CNNs: MobileNet and EfficientNet", "Deep Learning Fundamentals"],
    ["rnn.html", "RNN Basics", "RNN Basics: Recurrence and Backpropagation Through Time", "Deep Learning Fundamentals"],
    ["gru-lstm.html", "GRU and LSTM", "Gated RNNs: GRU and LSTM", "Deep Learning Fundamentals"],
    ["crossentropy-loss.html", "Cross-Entropy", "Cross-Entropy Loss", "Deep Learning Fundamentals"],
    ["kl-divergence.html", "KL Divergence", "KL Divergence", "Deep Learning Fundamentals"],
    ["gradient-descent.html", "Gradient Descent", "Gradient Descent", "Deep Learning Fundamentals"],
    ["backpropagation.html", "Backpropagation", "Backpropagation and Gradient Checking", "Deep Learning Fundamentals"],
    ["ctc-loss.html", "CTC Loss", "CTC Loss", "Deep Learning Fundamentals"],
    ["errors.html", "Model Errors", "Understanding Model Errors", "Deep Learning Fundamentals"],
    ["regularization.html", "Regularization", "Regularization: Methods Against Overfitting", "Deep Learning Fundamentals"],
    ["dropout.html", "Dropout", "Dropout", "Deep Learning Fundamentals"],
    ["l1-l2-regularization.html", "L1 and L2", "L1 and L2 Regularization", "Deep Learning Fundamentals"],
    ["data-augmentation.html", "Data Augmentation", "Data Augmentation", "Deep Learning Fundamentals"],
    ["mixup.html", "Mixup", "Mixup: Training on Blended Examples", "Deep Learning Fundamentals"],
    ["class-imbalance.html", "Class Imbalance", "Class Imbalance: Resampling, Class Weights and Focal Loss", "Deep Learning Fundamentals"],
    ["optimizers.html", "Momentum", "SGD, Momentum and Nesterov", "Deep Learning Fundamentals"],
    ["adaptive-optimizers.html", "Adaptive Optimizers", "Adaptive Optimizers: One Step Size per Weight", "Deep Learning Fundamentals"],
    ["adagrad.html", "AdaGrad", "AdaGrad: Per-Weight Step Sizes from All Past Gradients", "Deep Learning Fundamentals"],
    ["rmsprop.html", "RMSProp", "RMSProp: Step Sizes from a Moving Average of Recent Gradients", "Deep Learning Fundamentals"],
    ["adam.html", "Adam", "Adam: Momentum and RMSProp with Bias Correction", "Deep Learning Fundamentals"],
    ["optimizers-in-practice.html", "Optimizers in Practice", "Optimizers in Practice: The Training Loop Around the Optimizer", "Deep Learning Fundamentals"],
    ["adamw.html", "AdamW", "AdamW: Decoupled Weight Decay for Adam", "Deep Learning Fundamentals"],
    ["sam.html", "SAM", "Sharpness-Aware Minimization (SAM): Training Toward Flat Minima", "Deep Learning Fundamentals"],
    ["lr-schedules.html", "Learning Rate Schedules", "Learning Rate Schedules: Warmup, Decay, Cosine and Restarts", "Deep Learning Fundamentals"],
    ["gradient-clipping.html", "Gradient Clipping", "Gradient Clipping: Capping Exploding Gradients", "Deep Learning Fundamentals"],
    ["normalization.html", "Layers Compared", "Normalization Layers Compared", "Deep Learning Fundamentals"],
    ["batch-normalization.html", "Batch Normalization", "Batch Normalization", "Deep Learning Fundamentals"],
    ["layer-normalization.html", "Layer Normalization", "Layer Normalization and RMSNorm", "Deep Learning Fundamentals"],
    ["group-normalization.html", "Group Normalization", "Group Normalization and Instance Normalization", "Deep Learning Fundamentals"],
    ["scaling-laws.html", "Scaling Laws", "Scaling Laws", "Deep Learning Fundamentals"],
    ["ssl.html", "Self-Supervised", "Self-Supervised Learning", "Self-Supervised Learning"],
    ["contrastive-learning.html", "Contrastive Learning", "Contrastive Learning", "Self-Supervised Learning"],
    ["clip.html", "CLIP", "Image-Text Contrastive Learning (CLIP)", "Self-Supervised Learning"],
    ["non-contrastive-ssl.html", "Non-Contrastive", "Non-Contrastive Self-Supervised Learning", "Self-Supervised Learning"],
    ["masked-image-modeling.html", "Masked Image Modeling", "Masked Image Modeling", "Self-Supervised Learning"],
    ["ssl-failure-modes.html", "Failure Modes", "Self-Supervised Learning Failure Modes and Checks", "Self-Supervised Learning"],
    ["rl.html", "RL Basics", "RL Basics", "Reinforcement Learning"],
    ["rl-methods.html", "Value-Based RL", "Value-Based RL", "Reinforcement Learning"],
    ["q-learning.html", "Q-Learning", "Q-Learning", "Reinforcement Learning"],
    ["dqn.html", "DQN", "Deep Q-Networks (DQN)", "Reinforcement Learning"],
    ["rl-policy-gradients.html", "Policy Gradients", "Policy Gradients: REINFORCE, Actor-Critic and PPO", "Reinforcement Learning"],
    ["reinforce.html", "REINFORCE", "REINFORCE and the Baseline", "Reinforcement Learning"],
    ["actor-critic.html", "Actor-Critic", "Actor-Critic: A2C and A3C", "Reinforcement Learning"],
    ["ppo.html", "PPO", "Proximal Policy Optimization (PPO)", "Reinforcement Learning"],
    ["rl-continuous-actions.html", "Continuous-Action RL", "Continuous-Action RL", "Reinforcement Learning"],
    ["ddpg.html", "DDPG", "Deep Deterministic Policy Gradient (DDPG): Actor and Critic", "Reinforcement Learning"],
    ["ddpg-training.html", "Training DDPG", "Training DDPG: Target Networks, Replay and Noise", "Reinforcement Learning"],
    ["td3.html", "TD3", "Twin Delayed DDPG (TD3)", "Reinforcement Learning"],
    ["sac.html", "SAC", "Soft Actor-Critic (SAC)", "Reinforcement Learning"],
    ["rl-model-based.html", "Model-Based RL", "Model-Based RL: Dyna, AlphaZero and MuZero", "Reinforcement Learning"],
    ["multi-agent-rl.html", "Multi-Agent RL", "Multi-Agent Reinforcement Learning", "Reinforcement Learning"],
    ["rl-alignment.html", "Aligning with RL", "Aligning Language Models with RL", "Reinforcement Learning"],
    ["transformers.html", "Attention", "Attention", "Transformers"],
    ["transformer-position-masking.html", "Positional Encoding", "Positional Encoding and Masking", "Transformers"],
    ["transformer-block.html", "Transformer Block", "The Transformer Block", "Transformers"],
    ["cross-attention.html", "Cross-Attention", "Cross-Attention", "Transformers"],
    ["transformer-cost.html", "Cost and Efficiency", "Transformer Cost and Efficiency", "Transformers"],
    ["flash-attention.html", "FlashAttention", "FlashAttention", "Transformers"],
    ["kv-cache.html", "KV Cache", "The KV Cache", "Transformers"],
    ["grouped-query-attention.html", "MQA and GQA", "Multi-Query and Grouped-Query Attention", "Transformers"],
    ["sliding-window-attention.html", "Sliding Window", "Sliding-Window Attention", "Transformers"],
    ["attention-sinks.html", "Attention Sinks", "Attention Sinks and Streaming Generation", "Transformers"],
    ["adapter.html", "Adapters", "Adapters", "Transformers"],
    ["conformer.html", "Conformer Block", "The Conformer Block", "Transformers"],
    ["conformer-pytorch.html", "Conformer Training", "Conformer in PyTorch: Training and Streaming", "Transformers"],
    ["tokenizers.html", "Tokenizers", "Tokenizers", "LLMs"],
    ["subword-tokenization.html", "BPE", "Byte Pair Encoding (BPE)", "LLMs"],
    ["wordpiece.html", "WordPiece", "WordPiece Tokenizer", "LLMs"],
    ["unigram-tokenizer.html", "Unigram", "Unigram Tokenizer", "LLMs"],
    ["sentencepiece.html", "SentencePiece", "SentencePiece Toolkit", "LLMs"],
    ["decoding.html", "Decoding", "Decoding", "LLMs"],
    ["beam-search.html", "Beam Search", "Beam Search", "LLMs"],
    ["sampling.html", "Sampling", "Sampling the Next Token", "LLMs"],
    ["mixture-of-experts.html", "Mixture of Experts", "Mixture of Experts (MoE)", "LLMs"],
    ["mixture-of-experts-designs.html", "Mixture of Experts Designs", "Mixture of Experts Designs", "LLMs"],
    ["moe-bias-balancing.html", "Balancing", "Auxiliary-Loss-Free Load Balancing", "LLMs"],
    ["moe-expert-parallelism.html", "Parallelism", "Expert Parallelism", "LLMs"],
    ["moe-fine-tuning.html", "Fine-Tuning", "Fine-Tuning a Mixture of Experts", "LLMs"],
    ["probes.html", "Probes", "Activation Probes", "LLMs"],
    ["qformer.html", "Q-Former", "From BLIP to the Q-Former", "LLMs"],
    ["generative-models.html", "Generative Models", "Generative Models: What They Learn and How They Differ", "Generative Models"],
    ["gans.html", "GANs", "Generative Adversarial Networks (GANs)", "Generative Models"],
    ["gan-training.html", "Training GANs", "Training GANs: Mode Collapse, WGAN and the Move to Diffusion", "Generative Models"],
    ["diffusion.html", "Diffusion Models", "Diffusion Models: Adding Noise on a Schedule", "Generative Models"],
    ["diffusion-training.html", "Diffusion Training", "Training a Diffusion Model: Predicting the Noise", "Generative Models"],
    ["diffusion-sampling.html", "Faster Sampling", "Faster Diffusion Sampling: DDIM and Flow Matching", "Generative Models"],
    ["diffusion-guidance.html", "Guided Diffusion", "Guided and Latent Diffusion: Classifier-Free Guidance, Stable Diffusion and DiT", "Generative Models"],
    ["quantization.html", "Quantization", "Quantization Basics", "Model Efficiency"],
    ["quantization-ptq-qat.html", "PTQ and QAT", "Post-Training Quantization and Quantization-Aware Training", "Model Efficiency"],
    ["normalization-quantization.html", "Normalization and Quantization", "Normalization and Quantization", "Model Efficiency"],
    ["quantization-debugging.html", "Debugging", "Debugging a Quantized Model", "Model Efficiency"],
    ["nas.html", "NAS", "Neural Architecture Search Basics", "Model Efficiency"],
    ["nas-one-shot.html", "One-Shot NAS", "One-Shot NAS: Weight Sharing and DARTS", "Model Efficiency"],
    ["kd.html", "Distillation", "Knowledge Distillation", "Model Efficiency"],
    ["prune.html", "Pruning", "Pruning", "Model Efficiency"],
    ["audio-signals.html", "Audio Basics", "Audio & Signals Basics", "Audio & Signals"],
    ["adc.html", "ADC", "ADC Fundamentals", "Audio & Signals"],
    ["aliasing.html", "Aliasing", "Aliasing and Anti-Aliasing Filters", "Audio & Signals"],
    ["lti-convolution.html", "LTI and Convolution", "LTI Systems and Convolution", "Audio & Signals"],
    ["fourier.html", "Fourier and FFT", "Fourier Transform and the FFT", "Audio & Signals"],
    ["filters.html", "FIR and IIR", "How FIR and IIR Filters Shape Magnitude and Phase", "Audio & Signals"],
    ["stft.html", "STFT", "The STFT and Spectrograms", "Audio & Signals"],
    ["psd.html", "PSD", "Power Spectral Density", "Audio & Signals"],
    ["spectral-subtraction.html", "Spectral Subtraction", "Spectral Subtraction for Denoising", "Audio & Signals"],
    ["wiener-filter.html", "Wiener Filter", "The Wiener Filter", "Audio & Signals"],
    ["reverberation.html", "Reverberation", "Reverberation and Dereverberation", "Audio & Signals"],
    ["adaptive-filters.html", "Adaptive Filters", "Adaptive Filters and LMS", "Audio & Signals"],
    ["audio-features.html", "Audio Features", "MFCC and Other Audio Features", "Audio & Signals"],
    ["multitask-intro.html", "Multitask Learning", "Introduction to Multitask Learning", "Multitask Learning"],
    ["multitask-field-guide.html", "Field Guide", "The Multitask Field Guide", "Multitask Learning"],
    ["mgda.html", "MGDA", "MGDA (Multiple Gradient Descent Algorithm)", "Multitask Learning"],
    ["gradnorm.html", "GradNorm", "GradNorm (Gradient Normalization)", "Multitask Learning"],
    ["uncertainty-weighting.html", "Uncertainty Weighting", "Uncertainty Weighting", "Multitask Learning"],
    ["pcgrad.html", "PCGrad", "PCGrad (Projecting Conflicting Gradients)", "Multitask Learning"],
    ["gradvac.html", "GradVac", "GradVac (Gradient Vaccine)", "Multitask Learning"],
    ["cagrad.html", "CAGrad", "CAGrad (Conflict-Averse Gradient Descent)", "Multitask Learning"],
    ["multitask-training-loop.html", "Training Loop", "Gradient Balancing Inside the Training Loop", "Multitask Learning"]
  ];
  /* ORDER-END */

  /* TITLES-BEGIN */
  var TITLES = {
    "linear-algebra.html": "Vectors and Matrices",
    "probability.html": "Probability",
    "distributions.html": "Bernoulli Uniform",
    "gaussian.html": "Gaussian",
    "eigen-svd.html": "Eigenvectors",
    "svd.html": "SVD",
    "regression.html": "Regression",
    "logistic.html": "Logistic Regression",
    "mlp.html": "MLPs",
    "trees.html": "Decision Trees",
    "random-forests.html": "Random Forests",
    "gradient-boosting.html": "Gradient Boosting",
    "xgboost.html": "XGBoost and LightGBM",
    "svm.html": "SVMs",
    "knn.html": "k-NN",
    "naive-bayes.html": "Naive Bayes",
    "kmeans.html": "k-Means",
    "likelihood-em.html": "Likelihood and EM",
    "gmm.html": "GMMs",
    "hmm.html": "HMMs",
    "pca.html": "PCA",
    "ica.html": "ICA",
    "nmf.html": "NMF",
    "tsne.html": "t-SNE",
    "reco.html": "Recommender Systems",
    "cnn.html": "CNN Basics",
    "cnn-receptive-fields.html": "Receptive Fields",
    "cnn-architectures.html": "CNN Architectures Overview",
    "alexnet.html": "AlexNet",
    "vgg.html": "VGG",
    "inception.html": "Inception",
    "resnet.html": "ResNet",
    "efficient-cnns.html": "Efficient CNNs",
    "rnn.html": "RNN Basics",
    "gru-lstm.html": "GRU and LSTM",
    "crossentropy-loss.html": "Cross-Entropy",
    "kl-divergence.html": "KL Divergence",
    "gradient-descent.html": "Gradient Descent",
    "backpropagation.html": "Backpropagation",
    "ctc-loss.html": "CTC Loss",
    "errors.html": "Model Errors",
    "regularization.html": "Regularization",
    "dropout.html": "Dropout",
    "l1-l2-regularization.html": "L1 and L2",
    "data-augmentation.html": "Data Augmentation",
    "mixup.html": "Mixup",
    "class-imbalance.html": "Class Imbalance",
    "optimizers.html": "Momentum",
    "adaptive-optimizers.html": "Adaptive Optimizers",
    "adagrad.html": "AdaGrad",
    "rmsprop.html": "RMSProp",
    "adam.html": "Adam",
    "optimizers-in-practice.html": "Optimizers in Practice",
    "adamw.html": "AdamW",
    "sam.html": "SAM",
    "lr-schedules.html": "Learning Rate Schedules",
    "gradient-clipping.html": "Gradient Clipping",
    "normalization.html": "Layers Compared",
    "batch-normalization.html": "Batch Normalization",
    "layer-normalization.html": "Layer Normalization",
    "group-normalization.html": "Group Normalization",
    "scaling-laws.html": "Scaling Laws",
    "ssl.html": "Self-Supervised",
    "contrastive-learning.html": "Contrastive Learning",
    "clip.html": "CLIP",
    "non-contrastive-ssl.html": "Non-Contrastive",
    "masked-image-modeling.html": "Masked Image Modeling",
    "ssl-failure-modes.html": "Failure Modes",
    "rl.html": "RL Basics",
    "rl-methods.html": "Value-Based RL",
    "q-learning.html": "Q-Learning",
    "rl-policy-gradients.html": "Policy Gradients",
    "reinforce.html": "REINFORCE",
    "actor-critic.html": "Actor-Critic",
    "rl-continuous-actions.html": "Continuous-Action RL",
    "rl-model-based.html": "Model-Based RL",
    "dqn.html": "DQN",
    "ddpg.html": "DDPG",
    "ddpg-training.html": "Training DDPG",
    "multi-agent-rl.html": "Multi-Agent RL",
    "rl-alignment.html": "Aligning with RL",
    "transformers.html": "Attention",
    "transformer-position-masking.html": "Positional Encoding",
    "transformer-block.html": "Transformer Block",
    "cross-attention.html": "Cross-Attention",
    "transformer-cost.html": "Cost and Efficiency",
    "flash-attention.html": "FlashAttention",
    "kv-cache.html": "KV Cache",
    "grouped-query-attention.html": "MQA and GQA",
    "sliding-window-attention.html": "Sliding Window",
    "attention-sinks.html": "Attention Sinks",
    "adapter.html": "Adapters",
    "conformer.html": "Conformer Block",
    "conformer-pytorch.html": "Conformer Training",
    "tokenizers.html": "Tokenizers",
    "subword-tokenization.html": "BPE",
    "wordpiece.html": "WordPiece",
    "unigram-tokenizer.html": "Unigram",
    "sentencepiece.html": "SentencePiece",
    "decoding.html": "Decoding",
    "beam-search.html": "Beam Search",
    "sampling.html": "Sampling",
    "mixture-of-experts.html": "Mixture of Experts",
    "mixture-of-experts-designs.html": "Mixture of Experts Designs",
    "moe-bias-balancing.html": "Balancing",
    "moe-expert-parallelism.html": "Parallelism",
    "moe-fine-tuning.html": "Fine-Tuning",
    "probes.html": "Probes",
    "qformer.html": "Q-Former",
    "generative-models.html": "Generative Models",
    "gans.html": "GANs",
    "gan-training.html": "Training GANs",
    "diffusion.html": "Diffusion Models",
    "diffusion-training.html": "Diffusion Training",
    "diffusion-sampling.html": "Faster Sampling",
    "diffusion-guidance.html": "Guided Diffusion",
    "quantization.html": "Quantization",
    "quantization-ptq-qat.html": "PTQ and QAT",
    "normalization-quantization.html": "Normalization and Quantization",
    "quantization-debugging.html": "Debugging",
    "nas.html": "NAS",
    "nas-one-shot.html": "One-Shot NAS",
    "kd.html": "Distillation",
    "prune.html": "Pruning",
    "audio-signals.html": "Audio Basics",
    "adc.html": "ADC",
    "aliasing.html": "Aliasing",
    "lti-convolution.html": "LTI and Convolution",
    "fourier.html": "Fourier and FFT",
    "filters.html": "FIR and IIR",
    "stft.html": "STFT",
    "psd.html": "PSD",
    "spectral-subtraction.html": "Spectral Subtraction",
    "wiener-filter.html": "Wiener Filter",
    "reverberation.html": "Reverberation",
    "adaptive-filters.html": "Adaptive Filters",
    "audio-features.html": "Audio Features",
    "multitask-intro.html": "Multitask Learning",
    "multitask-field-guide.html": "Field Guide",
    "mgda.html": "MGDA",
    "gradnorm.html": "GradNorm",
    "uncertainty-weighting.html": "Uncertainty Weighting",
    "pcgrad.html": "PCGrad",
    "gradvac.html": "GradVac",
    "cagrad.html": "CAGrad",
    "multitask-training-loop.html": "Training Loop",
    "ppo.html": "PPO",
    "td3.html": "TD3",
    "sac.html": "SAC"
  };
  /* TITLES-END */

  /* Captured at load, before any await; never read again (C11). */
  var SELF = document.currentScript;
  var BASE = SELF && SELF.src;
  /* PODCAST-HOOK (tutorial-podcasts/player/PLAN.md): load the listen row. */
  try {
    var pcs = document.createElement('script');
    pcs.src = href('podcast-player.js');
    pcs.async = true;
    (document.head || document.documentElement).appendChild(pcs);
  } catch (e) { /* nav keeps working */ }

  function pageName(pathname) {
    var p = String(pathname || '');
    try { p = decodeURIComponent(p); } catch (e) { /* keep raw */ }
    if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
    var seg = p.split('/').pop().toLowerCase();
    if (!seg) return null;
    if (seg.indexOf('.') < 0) seg += '.html';
    if (seg === 'index.html') return null;
    return seg;
  }

  function fileOf(href) {
    var h = String(href || '').split('#')[0].split('?')[0];
    if (h.length > 1 && h.charAt(h.length - 1) === '/') h = h.slice(0, -1);
    var seg = h.split('/').pop().toLowerCase();
    if (seg && seg.indexOf('.') < 0) seg += '.html';
    return seg;
  }

  function fallbackTitle(full) {
    var t = String(full || '').split(/[:(]/)[0].replace(/\s+/g, ' ').trim();
    if (t.length <= 22) return t;
    var cut = t.slice(0, 23);
    var sp = cut.lastIndexOf(' ');
    return (sp > 0 ? cut.slice(0, sp) : t.slice(0, 22)).trim();
  }

  function shortOf(entry) {
    return TITLES[entry[0]] || entry[1] || fallbackTitle(entry[2]);
  }

  function href(file) {
    try { return new URL(file, BASE).href; } catch (e) { return file; }
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function hidden(text) {
    var s = el('span', null, text);
    s.setAttribute('aria-hidden', 'true');
    return s;
  }

  function sideLink(kind, entry, here) {
    var prev = kind === 'prev';
    var a = el('a', prev ? 'seq-prev' : 'seq-next');
    a.setAttribute('rel', prev ? 'prev' : 'next');
    a.setAttribute('href', href(entry[0]));
    var tip = entry[2] + (prev ? ', previous tutorial' : ', next tutorial');
    if (here && entry[3] && here[3] && entry[3] !== here[3]) {
      tip += (prev ? ', last in ' : ', first in ') + entry[3];
    }
    a.setAttribute('title', tip);
    var w = el('span', 'seq-w');
    if (prev) { w.appendChild(hidden('\u2190 ')); w.appendChild(document.createTextNode('Previous')); }
    else { w.appendChild(document.createTextNode('Next')); }
    a.appendChild(w);
    a.appendChild(document.createTextNode(' '));
    a.appendChild(el('span', 'seq-t', shortOf(entry)));
    if (!prev) a.appendChild(hidden(' \u2192'));
    return a;
  }

  function buildRow(list, page) {
    var nav = el('nav', 'tut-seq');
    nav.setAttribute('aria-label', 'Previous and next tutorial');
    var home = el('a', 'seq-home', 'All tutorials');
    home.setAttribute('href', href('tutorial.html'));
    nav.appendChild(home);
    var i = -1;
    for (var k = 0; k < list.length; k++) { if (list[k][0] === page) { i = k; break; } }
    if (i >= 0) {
      if (i > 0) nav.appendChild(sideLink('prev', list[i - 1], list[i]));
      if (i < list.length - 1) nav.appendChild(sideLink('next', list[i + 1], list[i]));
    }
    return nav;
  }

  function parseCatalog(text) {
    var doc = new DOMParser().parseFromString(text, 'text/html');
    var out = [];
    var secs = doc.getElementsByTagName('section');
    for (var s = 0; s < secs.length; s++) {
      var sec = secs[s];
      if ((' ' + (sec.getAttribute('class') || '') + ' ').indexOf(' cat ') < 0) continue;
      var cat = '';
      var all = sec.getElementsByTagName('*');
      for (var c = 0; c < all.length; c++) {
        if ((' ' + (all[c].getAttribute('class') || '') + ' ').indexOf(' cat-name ') >= 0) {
          cat = all[c].textContent.replace(/\s+/g, ' ').trim();
          break;
        }
      }
      var h2s = sec.getElementsByTagName('h2');
      for (var h = 0; h < h2s.length; h++) {
        var as = h2s[h].getElementsByTagName('a');
        if (!as.length || !as[0].getAttribute('href')) continue;
        var f = fileOf(as[0].getAttribute('href'));
        var full = as[0].textContent.replace(/\s+/g, ' ').trim();
        out.push([f, TITLES[f] || fallbackTitle(full), full, cat]);
      }
    }
    return out;
  }

  function sameList(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i][0] !== b[i][0] || a[i][2] !== b[i][2] || a[i][3] !== b[i][3]) return false;
    }
    return true;
  }

  function start() {
    if (!ENABLED || !SELF || !BASE) return;
    var crumb = SELF.previousElementSibling;
    if (!crumb || String(crumb.tagName).toLowerCase() !== 'p' ||
        (' ' + (crumb.getAttribute('class') || '') + ' ').indexOf(' crumb ') < 0) return;
    var page = pageName(location.pathname);
    if (!page) return;
    var row;
    try {
      row = buildRow(ORDER, page);
      crumb.parentNode.replaceChild(row, crumb);
    } catch (e) { return; }
    var proto = String(location.protocol);
    if ((proto !== 'http:' && proto !== 'https:') || typeof fetch !== 'function' ||
        typeof DOMParser === 'undefined') return;
    fetch(href('tutorial.html')).then(function (r) {
      if (!r.ok) throw new Error('status ' + r.status);
      return r.text();
    }).then(function (text) {
      var list = parseCatalog(text);
      if (list.length < 50 || sameList(list, ORDER)) return;
      ORDER = list;
      var fresh = buildRow(ORDER, page);
      if (row.parentNode) { row.parentNode.replaceChild(fresh, row); row = fresh; }
    })['catch'](function () { /* keep the embedded list */ });
  }

  start();
})();
