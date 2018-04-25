import {getTipsInProcess} from './algorithms';

const jStat = require('jStat').jStat;


export const generateTangle = ({nodeCount, lambda = 3.5, h=1, alpha=3.5, tipSelectionAlgorithm}) => {

 nodeCount = 1000;
  jStat.exponential.sample(lambda);
  const genesis = {
    name: '0',
    time: 0,
  };

  var constant = 40;
  var a = 1;
  var b = 1;
  var c = 1;
  var k =800;
  var ke = -1;
  let nodes = [genesis];
//let time = 0;
h = 1;
let time = h;
var func_lambda = lambda;
  while (nodes.length < nodeCount) {

  //    var func_lambda = k*Math.exp(ke*time);
    func_lambda = 25;
   if(time>=10 && time <= 15)
       func_lambda = 50;

    var delay = jStat.exponential.sample(func_lambda);
    time += delay;
    nodes.push({
      name: `${nodes.length}`,
      time,
      x: 300,
      y: 200,
    });
  }

  const links = [];
  for (let node of nodes) {
    const candidates = nodes
      .filter(candidate => candidate.time < node.time - h);

    const candidateLinks = links
      .filter(link => link.source.time < node.time - h);

    const tips = tipSelectionAlgorithm({
      nodes: candidates,
      links: candidateLinks,
      alpha,
    });

    if (tips.length > 0) {
      links.push({source: node, target: tips[0]});
      if (tips.length > 1 && tips[0].name !== tips[1].name) {
        links.push({source: node, target: tips[1]});
      }
    }

   if(nodes.length > 0 && links.length > 0)
       console.log(node.name+" "+getTipsInProcess({nodes,links},node.time).size+" "+node.time);
  };

  return {
    nodes,
    links,
  };
};
