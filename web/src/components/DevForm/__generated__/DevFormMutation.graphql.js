/**
 * @flow
 * @relayHash aec8b13db48b6502bdbd689ef7f207aa
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DevFormMutationVariables = {|
  githubUsername: string,
  technologies: $ReadOnlyArray<?string>,
  latitude: number,
  longitude: number,
|};
export type DevFormMutationResponse = {|
  +addDev: ?{|
    +id: ?string,
    +name: ?string,
    +technologies: ?$ReadOnlyArray<?string>,
    +bio: ?string,
    +githubUsername: ?string,
    +avatarUrl: ?string,
  |}
|};
export type DevFormMutation = {|
  variables: DevFormMutationVariables,
  response: DevFormMutationResponse,
|};
*/


/*
mutation DevFormMutation(
  $githubUsername: String!
  $technologies: [String]!
  $latitude: Float!
  $longitude: Float!
) {
  addDev(githubUsername: $githubUsername, technologies: $technologies, latitude: $latitude, longitude: $longitude) {
    id
    name
    technologies
    bio
    githubUsername
    avatarUrl
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "githubUsername",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "technologies",
    "type": "[String]!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "latitude",
    "type": "Float!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "longitude",
    "type": "Float!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "addDev",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "githubUsername",
        "variableName": "githubUsername"
      },
      {
        "kind": "Variable",
        "name": "latitude",
        "variableName": "latitude"
      },
      {
        "kind": "Variable",
        "name": "longitude",
        "variableName": "longitude"
      },
      {
        "kind": "Variable",
        "name": "technologies",
        "variableName": "technologies"
      }
    ],
    "concreteType": "DevType",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "technologies",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "bio",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "githubUsername",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "avatarUrl",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DevFormMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DevFormMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DevFormMutation",
    "id": null,
    "text": "mutation DevFormMutation(\n  $githubUsername: String!\n  $technologies: [String]!\n  $latitude: Float!\n  $longitude: Float!\n) {\n  addDev(githubUsername: $githubUsername, technologies: $technologies, latitude: $latitude, longitude: $longitude) {\n    id\n    name\n    technologies\n    bio\n    githubUsername\n    avatarUrl\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4135f130f188618dd9e16b4886fba3eb';
module.exports = node;
