import React, { Component } from "react";
import CommonAPI from "./CommonApi";

class NodeApi extends Component {

  /** WRITE **/

  /**
   * Create a Node
   * POST /api/v1/nodes
   * 
   * @body Node
   */
  static createNode = async (body) => {
    return await CommonAPI.post(`/api/v1/nodes`, body);
  }


  /**
   * Partially update the specified Node
   * PATCH /api/v1/nodes/{name}
   * 
   * @param name
   * @body patch
   */
  static patchNode = async (name, body) => {
    const node = await CommonAPI.patch(`/api/v1/nodes/${name}`, body);
    return node;
  }

  // /** READ **/

  /**
   * list or watch objects of kind Node
   * GET /api/v1/nodes
   * 
   * @param parameters
  */
  static listAllNode = async (parameters) => {
    const nodeList = await CommonAPI.get(`/api/v1/nodes`, parameters);
    return nodeList.items;
  }

  /**
   * list or watch objects of kind Node
   * GET /api/v1/nodes/{name}
   * 
  */
  static readNode = async (name) => {
    const node = await CommonAPI.get(`/api/v1/nodes/${name}`);
    return node;
  }


}
export default NodeApi;