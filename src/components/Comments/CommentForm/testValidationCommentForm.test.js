/* eslint-disable prefer-const */
import { validationCommentForm } from './validationCommentForm';

describe('Place form validator', () => {
  let subject = 'sth';
  let message = 'sth';

  it('returns valid when form is properly filled', () => {
    let result = validationCommentForm(subject, message);
    expect(result).toEqual(true);
  });

  it('returns no-valid when form is not properly filled (empty subject)', () => {
    subject = '';
    let result = validationCommentForm(subject, message);
    expect(result).toEqual(false);
  });

  it('returns no-valid when form is not properly filled (empty message)', () => {
    message = '';
    let result = validationCommentForm(subject, message);
    expect(result).toEqual(false);
  });

  it('returns no-valid when form is not properly filled (subject is too long (more than 30 characters))', () => {
    subject = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    message = 'something';
    console.log(subject.length);
    let result = validationCommentForm(subject, message);
    expect(result).toEqual(false);
  });

  it('returns no-valid when form is not properly filled (message is too long (more than 500 characters))', () => {
    subject = 'something';
    message = `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
    console.log(subject.length);
    let result = validationCommentForm(subject, message);
    expect(result).toEqual(false);
  });
});
