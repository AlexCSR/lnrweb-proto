---
basename: "news-single"
kind: "normal"
url: "/news/amazon-reinvent-announces-aws-fargate-amazon-elastic-container-service-for-kubernetes-eks-lr-branded-btw.html"

title: "Amazon Elastic Container Service for Kubernetes & AWS Fargate announced at AWS re:Invent 2017"
description: ""
category: "Project launch"
author: "L+R"
date: 2017-11-29T20:44:35.000Z

preview_image: "images/27-cover.jpg"
story_image: "images/27-cover.jpg"

---

L+R was called on by the prolific Amazon Web Services team to develop the Visual Identity for their new [AWS Fargate](https://aws.amazon.com/blogs/aws/aws-fargate/), [AWS ECS](https://aws.amazon.com/ecs/), and [AWS EKS](https://aws.amazon.com/eks/) offerings. The services, used by the likes of Unibosoft, GoPro, Expedia, and WeWork, were announced during [re:Invent 2017](https://reinvent.awsevents.com/) and covered around the world.

{{% img src="images/27-image.png" %}}

[Original Post titled “Say Hello to AWS Fargate & Amazon Elastic Container Service for Kubernetes (EKS)” by Tiffany Jernigan, Developer Advocate, Amazon Web Services](https://medium.com/@tiffanyfayj/say-hello-to-amazon-fargate-and-amazon-elastic-container-service-for-kubernetes-66707dd14976)

[{{% img src="images/27-logo-medium.png" %}}](https://medium.com/@tiffanyfayj/say-hello-to-amazon-fargate-and-amazon-elastic-container-service-for-kubernetes-66707dd14976)

By the way, Amazon ECS, now, actually stands for **[Amazon Elastic Container Service](https://aws.amazon.com/ecs/)** (instead of Amazon EC2 Container Service). We also have a new logo.

{{% img src="images/27-logo-ecs.png" %}}

A few months ago, I polled twitter about Amazon ECS and here were some responses:

{{% tweet 893302199652016128 %}}

{{% tweet 893241710993588224 %}}

Well, you asked, and we listened.

We want you to be able to choose how you want to run containers on AWS, however that may be, and have the best experience. So here are new options for running containers on AWS!:

{{% img src="images/27-logo-fargate.png" %}}

**[AWS Fargate](https://aws.amazon.com/ecs/fargate/)** is a new technology and launch type integrated with Amazon ECS (and Amazon EKS in 2018) which abstracts away the underlying infrastructure. What does this mean? **No more needing to provision, configure, or manage any clusters or instances!** You can just jump directly to creating a task definition, defining your networking and IAM policies, and let Fargate place, run, and auto-scale for you.

Feel like you want more control over your clusters? No problem; just use the EC2 launch type. If you want to switch your services between the EC2 and Fargate launch types, you can easily do so.

Wondering what the pay model is? You just pay per-second based on your vCPU and memory usage.

Want to try it out? Fargate is now available for GA in us-east-1 (N. Virginia). Try out your first run [here](https://console.aws.amazon.com/ecs/home?region=us-east-1#/firstRun). You can also head directly over to the AWS Console or update your AWS CLI!

To learn more, here are some resources:\
[Blog: Introducing AWS Fargate — Run Containers without Managing Infrastructure](https://aws.amazon.com/blogs/aws/aws-fargate/)\
[Blog: AWS Fargate: A Product Overview](https://aws.amazon.com/blogs/compute/aws-fargate-a-product-overview/)\
[What’s New: Introducing AWS Fargate](https://aws.amazon.com/about-aws/whats-new/2017/11/introducing-aws-fargate-a-technology-to-run-containers-without-managing-infrastructure/)\
[Fargate home page](https://aws.amazon.com/fargate/)\
[Amazon ECS documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)\
[AWS CLI](https://aws.amazon.com/cli/)

{{% img src="images/27-logo-eks.png" %}}

**[Amazon Elastic Container Service for Kubernetes (Amazon EKS)](https://aws.amazon.com/kubernetes)** (preview) is a **fully managed [Kubernetes](https://kubernetes.io/) service** which makes running Kubernetes on AWS much simpler! You don’t need to worry about deploying or managing your clusters — Amazon EKS does it for you. Not only that, it will automatically deploy three Kubernetes masters across three availability zones to achieve high availability! And like with Amazon ECS, we provide native AWS integrations.

Have existing plugins and tooling? No worries — Amazon EKS runs the upstream version of Kubernetes. You also don’t need to make any changes to your code to get your Kubernetes application running on Amazon EKS. Want to take a look at or manage your Kubernetes clusters? Just use [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)!

[Sign up for the preview now!](https://pages.awscloud.com/amazon-eks-preview.html)

To learn more, here are some resources:\
[Blog: Amazon Elastic Container Service for Kubernetes](https://aws.amazon.com/blogs/aws/amazon-elastic-container-service-for-kubernetes/)\
[What’s New: Introducing Amazon Elastic Container Service for Kubernetes (Preview)](https://aws.amazon.com/about-aws/whats-new/2017/11/introducing-amazon-elastic-container-service-for-kubernetes/)\
[Amazon EKS](https://aws.amazon.com/eks/)\
[Kubernetes](https://kubernetes.io/)\
[GitHub: Kubernetes](https://github.com/kubernetes/kubernetes)\
[kubctl](https://kubernetes.io/docs/reference/kubectl/overview/)\
[GitHub: Heptio Authenticator](https://github.com/heptio/authenticator)
