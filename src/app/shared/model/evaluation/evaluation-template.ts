import {EvaluationScenario} from './evaluation-scenario';
import {EvaluationMaterial} from './evaluation-material';

export class EvaluationTemplate {

  /** Description of the evaluation template. */
  private _description: string;

  /**
   * Default constructor.
   *
   * @param uri
   * @param name
   * @param description
   */
  constructor(uri: string, name: string, description: string) {
    this._uri = uri;
    this._name = name;
    this._description = description;
  }

  /** URI of the evaluation template. */
  private _uri: string;

  /**
   * Getter for uri.
   *
   * @return {string}
   */
  get uri(): string {
    return this._uri;
  }

  /** Name of the evaluation template. */
  private _name: string;

  /**
   * Getter for name.
   *
   * @return {string}
   */
  get name(): string {
    return this._name;
  }

  /** List of scenarios in the evaluation template. */
  private _scenarios: EvaluationScenario[] = [];

  /**
   * Getter for scenarios.
   *
   * @return {EvaluationScenario[]}
   */
  get scenarios(): EvaluationScenario[] {
    return this._scenarios;
  }

  /**
   * Tries to convert a JSON object into an EvaluationTemplate and returns a new instance
   * of such a template. If an error occurs during the conversion process, this method
   * returns null.
   *
   * @param object The
   * @return {EvaluationTemplate|null}
   */
  public static fromJson(object: any, url: string): EvaluationTemplate {
    try {
      if (typeof object == 'string') {
        object = JSON.parse(object);
      }
      let template = new EvaluationTemplate(url, object['_name'], object['_description']);
      let baseURL = url.substr(0, url.lastIndexOf('/')) + '/';
      for (let scenario of object['_scenarios']) {
        let materials: EvaluationMaterial[] = [];
        let illustrations: EvaluationMaterial[] = [];
        if (scenario['_material']) {
          for (let material of scenario['_material']) {
            materials.push(new EvaluationMaterial(material['_name'], material['_description'], baseURL + material['_url']));
          }
        }
        if (scenario['_illustrations']) {
          for (let illustration of scenario['_illustrations']) {
            illustrations.push(new EvaluationMaterial(illustration['_name'], illustration['_description'], baseURL + illustration['_url']));
          }
        }
        template.addScenario(new EvaluationScenario(scenario['_id'], scenario['_name'], scenario['_description'], scenario['_k'], illustrations, materials));
      }
      return template;
    } catch (e) {
      console.log('Could not parse provided object as evaluation template.');
      return null;
    }
  }

  /**
   * Adds an evaluation scenario object to the evaluation template.
   *
   * @param scenario EvalationScenario to add.
   */
  public addScenario(scenario: EvaluationScenario) {
    this._scenarios.push(scenario);
  }

  /**
   * Removes an evaluation scenario object from the evaluation template.
   *
   * @param scenario EvalationScenario to remove.
   */
  public removeScenario(scenario: EvaluationScenario) {
    let index = this._scenarios.indexOf(scenario);
    this.removeScenarioAtIndex(index);
  }

  /**
   * Removes the evaluation scenario object at the specified position.
   *
   * @param index Position of EvaluationScenario in the array.
   */
  public removeScenarioAtIndex(index: number) {
    if (index > -1 && index < this._scenarios.length) {
      this._scenarios.splice(index, 1);
    }
  }

  /**
   * Returns the evaluation scenario at the specified position or null, if the
   * position is out of the array's bounds.
   *
   * @param position Index of the scenario to return.
   * @return {EvaluationScenario | null}
   */
  public evaluationScenario(position: number): EvaluationScenario {
    if (this._scenarios.length > position) {
      return this._scenarios[position];
    } else {
      return null;
    }
  }

  /**
   * Returns true, if an Evaluation scenario exists at the specified position and
   * false otherwise.
   *
   * @param position
   */
  public hasEvaluationScenario(position: number) {
    return position < this._scenarios.length;
  }

  /**
   * Returns the number of scenarios in this evaluation template.
   *
   * @return {number}
   */
  public numberOfScenarios() {
    return this._scenarios.length;
  }
}
